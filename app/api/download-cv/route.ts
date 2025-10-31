import { promises as fs } from "fs"
import path from "path"

const DOWNLOAD_BASE_NAME = "Abderrahmane_ErRaqabi_CV"
const CANDIDATE_PATHS = [
  path.join(process.cwd(), "public", `${DOWNLOAD_BASE_NAME}.pdf`),
  path.join(process.cwd(), "public", "Abderrahmane Er-Raqabi Cv.pdf"),
  path.join(process.cwd(), "autoCV-2", "cv.pdf"),
  path.join(process.cwd(), "autoCV-2", "build", "cv.pdf"),
  path.join(process.cwd(), "public", "cv.pdf"),
  path.join(process.cwd(), "autoCV-2", "cv.tex"),
  path.join(process.cwd(), "public", `${DOWNLOAD_BASE_NAME}.tex`),
  path.join(process.cwd(), "public", "cv.tex"),
]

const CONTENT_TYPE_BY_EXTENSION: Record<string, string> = {
  ".pdf": "application/pdf",
  ".tex": "text/x-tex",
}

export const runtime = "nodejs"

export async function GET() {
  for (const filePath of CANDIDATE_PATHS) {
    try {
      const file = await fs.readFile(filePath)

      const extension = path.extname(filePath).toLowerCase()
      const fileName = path.basename(filePath)
      const downloadName = extension ? `${DOWNLOAD_BASE_NAME}${extension}` : fileName
      const contentType = CONTENT_TYPE_BY_EXTENSION[extension] ?? "application/octet-stream"

      return new Response(file, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${downloadName}"`,
          "Content-Length": String(file.length),
          "Cache-Control": "no-store",
        },
      })
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        console.error(`Failed to read CV at ${filePath}`, error)
        return new Response("Unable to load CV file.", { status: 500 })
      }
    }
  }

  return new Response("CV not found. Please add the generated PDF or TeX source to the repository.", {
    status: 404,
  })
}
