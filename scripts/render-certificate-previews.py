"""Render the first page of verified certificate PDFs as website previews.

Run from the repository root with:
    python scripts/render-certificate-previews.py
Requires the local PyMuPDF package (`pip install PyMuPDF`).
"""

from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "private" / "certificates"
DESTINATION = ROOT / "public" / "certificate-previews"

FILES = {
    "Certification grover.pdf": "grover.png",
    "Cloud Computing Security.pdf": "cloud-computing-security.png",
    "Attestations - SIMDUT 2015.pdf": "whmis-2015.png",
    "PolyMTL - Protections respiratoires - Abderrahmane Er-Raqabi - 2025-09-24.pdf": "respiratory-protection.png",
}


def main() -> None:
    DESTINATION.mkdir(parents=True, exist_ok=True)
    for source_name, output_name in FILES.items():
        document = fitz.open(SOURCE / source_name)
        page = document.load_page(0)
        pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
        pixmap.save(DESTINATION / output_name)
        document.close()


if __name__ == "__main__":
    main()
