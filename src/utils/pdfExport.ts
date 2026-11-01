import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfExportProgress {
  currentPage: number;
  totalPages: number;
  percent: number;
  status: 'preparing' | 'rendering' | 'saving' | 'completed' | 'error';
  message: string;
}

export interface ExportPdfOptions {
  containerId?: string;
  fileName?: string;
  scale?: number;
  quality?: number;
  onProgress?: (progress: PdfExportProgress) => void;
}

/**
 * Accurately converts OKLCH color components to sRGB / RGBA string for html2canvas compatibility.
 */
export function oklchToRgb(lStr: string, cStr: string, hStr: string, aStr?: string): string {
  let l = lStr.endsWith('%') ? parseFloat(lStr) / 100 : parseFloat(lStr);
  let c = parseFloat(cStr);
  let h = hStr === 'none' || isNaN(parseFloat(hStr)) ? 0 : parseFloat(hStr);
  let a = aStr ? (aStr.endsWith('%') ? parseFloat(aStr) / 100 : parseFloat(aStr)) : 1;

  if (isNaN(l)) l = 0;
  if (isNaN(c)) c = 0;

  const rad = (h * Math.PI) / 180;
  const a_ = c * Math.cos(rad);
  const b_ = c * Math.sin(rad);

  const l_ = l + 0.3963377774 * a_ + 0.2158037573 * b_;
  const m_ = l - 0.1055613458 * a_ - 0.0638541728 * b_;
  const s_ = l - 0.0894841775 * a_ - 1.2914855480 * b_;

  const l_cube = l_ * l_ * l_;
  const m_cube = m_ * m_ * m_;
  const s_cube = s_ * s_ * s_;

  const r_lin = +4.0767416621 * l_cube - 3.3077115913 * m_cube + 0.2309699292 * s_cube;
  const g_lin = -1.2684380046 * l_cube + 2.6097574011 * m_cube - 0.3413193965 * s_cube;
  const b_lin = -0.0041960863 * l_cube - 0.7034186147 * m_cube + 1.7076147010 * s_cube;

  const toSrgb = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    return clamped <= 0.0031308
      ? Math.round(clamped * 12.92 * 255)
      : Math.round((1.055 * Math.pow(clamped, 1 / 2.4) - 0.055) * 255);
  };

  const r = toSrgb(r_lin);
  const g = toSrgb(g_lin);
  const b = toSrgb(b_lin);

  return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
}

/**
 * Replaces all occurrences of oklch(...) inside a CSS string with standard rgb(...) / rgba(...).
 */
export function convertAllOklchInString(str: string): string {
  if (!str || typeof str !== 'string' || !str.includes('oklch')) {
    return str;
  }
  return str.replace(
    /oklch\(\s*([\d\.\%]+)\s+([\d\.\%]+)\s+([\d\.]+|none)(?:\s*\/\s*([\d\.\%]+))?\s*\)/gi,
    (_, l, c, h, a) => oklchToRgb(l, c, h, a)
  );
}

/**
 * Generates an authentic legal/statutory file name based on document type and state.
 */
export function getDefaultPdfFileName(docType: string, state: any): string {
  const sanitize = (str: string) =>
    (str || '')
      .trim()
      .replace(/[^a-zA-Z0-9\-]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '');

  switch (docType) {
    case 'withholdingReturn': {
      const company = sanitize(state?.general?.companyName || 'ATC_Ltd');
      const month = sanitize(state?.general?.month || 'Period');
      const fy = sanitize(state?.general?.fy || '2025-2026');
      return `${company}_Withholding_Return_TDS_${month}_FY_${fy}.pdf`;
    }
    case 'partnershipRecon': {
      const firm = sanitize(state?.firm?.firmName || 'Partnership_Firm');
      const regNo = sanitize(state?.firm?.regNo || 'Reg');
      return `${firm}_Reconstitution_Form_V_Reg_${regNo}.pdf`;
    }
    case 'partnership': {
      const firm = sanitize(state?.info?.firmName || 'Partnership_Firm');
      return `${firm}_Partnership_Deed_Statutory.pdf`;
    }
    case 'rjscReturn': {
      const company = sanitize(state?.meetingInfo?.companyName || 'Company');
      const agmYear = sanitize(state?.meetingInfo?.financialYearEnd || 'Annual');
      return `${company}_RJSC_Annual_Return_Schedule_X_${agmYear}.pdf`;
    }
    case 'combined': {
      const name = sanitize(state?.birthCertificate?.name || 'Applicant');
      return `Combined_Legal_Immigration_Dossier_${name}.pdf`;
    }
    case 'valuation': {
      const ref = sanitize(state?.general?.refNo || 'Valuation');
      const sponsor = sanitize(state?.sponsor?.name || 'Client');
      return `Asset_Valuation_Certificate_${ref}_${sponsor}.pdf`;
    }
    case 'company': {
      const company = sanitize(state?.company?.companyName || 'Company');
      return `${company}_RJSC_Company_Registration_Forms.pdf`;
    }
    default:
      return 'Statutory_Document.pdf';
  }
}

/**
 * Finds all previewed A4 pages inside the target container.
 */
export function findPreviewPages(container: HTMLElement): HTMLElement[] {
  // Look for .a4-page elements
  const pageNodes = Array.from(container.querySelectorAll<HTMLElement>('.a4-page'));
  if (pageNodes.length > 0) {
    return pageNodes;
  }

  // Fallback: search for elements with inline width 210mm or section/div children
  const fallbackNodes = Array.from(
    container.querySelectorAll<HTMLElement>('section, div[style*="210mm"]')
  ).filter((el) => {
    const rect = el.getBoundingClientRect();
    return rect.width > 200 && rect.height > 200;
  });

  return fallbackNodes.length > 0 ? fallbackNodes : [container];
}

/**
 * Exports the currently previewed document to an A4 PDF preserving layout, styles,
 * and high-fidelity text/table rendering using html2canvas and jsPDF.
 */
export async function exportDocumentToPdf(options: ExportPdfOptions = {}): Promise<void> {
  const {
    containerId = 'document-output-scroll-container',
    fileName = 'Statutory_Document.pdf',
    scale = 2,
    quality = 0.95,
    onProgress
  } = options;

  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Document container with id "${containerId}" not found.`);
  }

  // Report initial preparation
  onProgress?.({
    currentPage: 0,
    totalPages: 0,
    percent: 5,
    status: 'preparing',
    message: 'Analyzing preview pages and layout...'
  });

  // Temporarily reset CSS scale/zoom transforms on parent containers
  // so html2canvas renders exact pixel dimensions without transformation artifacts
  const transformedAncestors: { element: HTMLElement; originalTransform: string; originalOrigin: string }[] = [];
  const zoomContainers = container.querySelectorAll<HTMLElement>('[style*="transform"], [style*="scale"]');

  zoomContainers.forEach((el) => {
    transformedAncestors.push({
      element: el,
      originalTransform: el.style.transform,
      originalOrigin: el.style.transformOrigin
    });
    el.style.transform = 'none';
    el.style.transformOrigin = 'initial';
  });

  // Allow DOM reflow
  await new Promise((resolve) => setTimeout(resolve, 80));

  try {
    const pages = findPreviewPages(container);
    const totalPages = pages.length;

    if (totalPages === 0) {
      throw new Error('No printable pages found in the preview container.');
    }

    onProgress?.({
      currentPage: 0,
      totalPages,
      percent: 10,
      status: 'preparing',
      message: `Found ${totalPages} statutory ${totalPages === 1 ? 'page' : 'pages'}. Initializing PDF engine...`
    });

    // Create jsPDF instance in A4 format (210mm x 297mm portrait)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;

    for (let i = 0; i < totalPages; i++) {
      const pageEl = pages[i];
      const pageNum = i + 1;

      // Progress reporting
      const currentPercent = Math.round(10 + (i / totalPages) * 80);
      onProgress?.({
        currentPage: pageNum,
        totalPages,
        percent: currentPercent,
        status: 'rendering',
        message: `Rendering page ${pageNum} of ${totalPages}...`
      });

      // Scroll page into view momentarily for optimal font rendering
      pageEl.scrollIntoView({ behavior: 'instant', block: 'nearest' } as any);

      // Render canvas using html2canvas
      const canvas = await html2canvas(pageEl, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc, clonedEl) => {
          // 1. Intercept getComputedStyle in the cloned iframe to translate any Tailwind v4 OKLCH colors to standard sRGB
          if (clonedDoc.defaultView) {
            const origGetComputedStyle = clonedDoc.defaultView.getComputedStyle;
            clonedDoc.defaultView.getComputedStyle = function (el: Element, pseudo?: string | null) {
              const style = origGetComputedStyle.call(this, el, pseudo);
              return new Proxy(style, {
                get(target, prop, receiver) {
                  const val = Reflect.get(target, prop, receiver);
                  if (typeof val === 'string' && val.includes('oklch')) {
                    return convertAllOklchInString(val);
                  }
                  if (typeof val === 'function' && prop === 'getPropertyValue') {
                    return function (propName: string) {
                      const raw = target.getPropertyValue(propName);
                      return typeof raw === 'string' && raw.includes('oklch')
                        ? convertAllOklchInString(raw)
                        : raw;
                    };
                  }
                  return val;
                }
              });
            };
          }

          // 2. Pre-sanitize all element inline styles across the cloned subtree
          const allElements = [clonedEl, ...Array.from(clonedEl.querySelectorAll<HTMLElement>('*'))];
          const colorProps = [
            'color',
            'backgroundColor',
            'borderColor',
            'borderTopColor',
            'borderRightColor',
            'borderBottomColor',
            'borderLeftColor',
            'outlineColor'
          ] as const;

          allElements.forEach((el) => {
            try {
              const comp = window.getComputedStyle(el);
              for (const p of colorProps) {
                const v = comp[p];
                if (v && typeof v === 'string' && v.includes('oklch')) {
                  (el.style as any)[p] = convertAllOklchInString(v);
                }
              }
            } catch (e) {
              // Ignore any inaccessible elements
            }
          });

          // 3. Remove exterior drop-shadows and margins
          clonedEl.style.boxShadow = 'none';
          clonedEl.style.margin = '0 auto';
          clonedEl.style.transform = 'none';

          // 4. Ensure all images are displayed properly
          const images = clonedEl.querySelectorAll('img');
          images.forEach((img) => {
            img.style.display = 'block';
          });
        }
      });

      // Convert canvas to image data
      const imgData = canvas.toDataURL('image/jpeg', quality);

      // Compute aspect ratio to preserve exact A4 proportions
      const canvasRatio = canvas.height / canvas.width;
      // Standard A4 ratio is ~1.41428
      let renderHeightMm = A4_HEIGHT_MM;
      let renderWidthMm = A4_WIDTH_MM;

      // If page aspect ratio diverges slightly, adjust proportionally
      if (Math.abs(canvasRatio - 1.414) > 0.05) {
        renderHeightMm = Math.min(A4_HEIGHT_MM, A4_WIDTH_MM * canvasRatio);
      }

      // Center vertically if page is slightly shorter than standard 297mm
      const yOffsetMm = Math.max(0, (A4_HEIGHT_MM - renderHeightMm) / 2);

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(
        imgData,
        'JPEG',
        0,
        yOffsetMm,
        renderWidthMm,
        renderHeightMm,
        undefined,
        'FAST'
      );
    }

    onProgress?.({
      currentPage: totalPages,
      totalPages,
      percent: 95,
      status: 'saving',
      message: 'Compiling PDF document and preparing download...'
    });

    // Save and trigger download
    pdf.save(fileName);

    onProgress?.({
      currentPage: totalPages,
      totalPages,
      percent: 100,
      status: 'completed',
      message: 'PDF exported successfully!'
    });
  } catch (err: any) {
    onProgress?.({
      currentPage: 0,
      totalPages: 0,
      percent: 0,
      status: 'error',
      message: err?.message || 'Failed to export PDF.'
    });
    throw err;
  } finally {
    // Restore original transforms on ancestors
    transformedAncestors.forEach(({ element, originalTransform, originalOrigin }) => {
      element.style.transform = originalTransform;
      element.style.transformOrigin = originalOrigin;
    });
  }
}
