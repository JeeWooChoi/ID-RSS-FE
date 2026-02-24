import { useState, type ChangeEvent, type DragEvent } from "react";

interface FileUploadZoneProps {
  label: string;
}

export const FileUploadZone = ({ label }: FileUploadZoneProps) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  return (
    <div
      onDragOver={(e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() =>
        (document.getElementById("fileInput") as HTMLInputElement)?.click()
      }
      style={{
        border: `2px dashed ${dragging ? "#6366f1" : file ? "#22c55e" : "#ffffff20"}`,
        borderRadius: 12,
        padding: "40px 30px",
        textAlign: "center",
        cursor: "pointer",
        background: dragging ? "#6366f108" : file ? "#22c55e06" : "#ffffff04",
        transition: "all 0.2s",
        marginBottom: 8,
      }}
    >
      <input
        id="fileInput"
        type="file"
        accept=".xlsx,.xls,.csv"
        style={{ display: "none" }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const f = e.target.files?.[0];
          if (f) setFile(f);
        }}
      />
      <div style={{ fontSize: 32, marginBottom: 10 }}>{file ? "✅" : "📂"}</div>
      <div
        style={{
          color: file ? "#22c55e" : "#94a3b8",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {file ? file.name : label}
      </div>
      <div style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>
        {file
          ? "파일이 선택되었습니다"
          : "클릭하거나 파일을 드래그하세요 (.xlsx, .xls, .csv)"}
      </div>
    </div>
  );
};
