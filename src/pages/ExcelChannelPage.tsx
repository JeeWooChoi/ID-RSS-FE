import { excelChannelApi } from "@/features/excel-channel/api/excelChannelApi";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { useState } from "react";

interface FormState {
  sheetName: string;
  startRow: string;
  endRow: string;
  headerRow: string;
  channelNameColumn: string;
  appleIdColumn: string;
  rssColumn: string;
  country: string;
  overwrite: boolean;
  returnFile: boolean;
  file: File | null;
}

const INITIAL_FORM: FormState = {
  sheetName: "",
  startRow: "",
  endRow: "",
  headerRow: "1",
  channelNameColumn: "채널명",
  appleIdColumn: "애플 ID",
  rssColumn: "RSS",
  country: "US",
  overwrite: true,
  returnFile: false,
  file: null,
};

export const ExcelChannelPage = () => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState, value: string | boolean | File | null) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) set("file", f);
  };

  const handleSubmit = async () => {
    if (!form.file) return alert("파일을 업로드해주세요.");

    try {
      const data = await excelChannelApi({ ...form, file: form.file });
      console.log(data);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col max-w-[95%] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-100 mb-1">
          엑셀 → 채널명으로 검색
        </h2>
        <p className="text-m text-slate-500">
          엑셀 파일의 채널명 컬럼을 읽어 Apple ID와 RSS URL을 반환합니다.
        </p>
      </div>

      <div className="px-10">
        {/* 파일 업로드 */}
        <SectionTitle>파일</SectionTitle>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all mb-6 ${
            dragging
              ? "border-indigo-500 bg-indigo-500/5"
              : form.file
                ? "border-secondary-color"
                : "border-white/30 hover:border-gray-500"
          }`}
        >
          <input
            id="fileInput"
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) set("file", f);
            }}
          />
          {/* 삭제 버튼 */}
          {form.file && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // 파일 선택 창 열리는 거 막기
                set("file", null);
              }}
              className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/30 cursor-pointer text-gray-200 hover:text-red-500 transition-all text-xs flex items-center justify-center"
            >
              ✕
            </button>
          )}
          <div className="text-2xl mb-2">{form.file ? "✅" : "📂"}</div>
          <div
            className={`text-sm font-medium ${form.file ? "text-secondary-color" : "text-gray-400"}`}
          >
            {form.file
              ? form.file.name
              : "엑셀 파일을 드래그하거나 클릭해서 업로드"}
          </div>
          <div className="text-m text-gray-400 mt-1">.xlsx, .xls, .csv</div>
        </div>

        {/* 시트 설정 */}
        <SectionTitle>시트 설정</SectionTitle>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <Label required>시트명</Label>
            <Input
              placeholder="ex) US_미국"
              value={form.sheetName}
              onChange={(e) => set("sheetName", e.target.value)}
            />
          </div>
          <div>
            <Label required>헤더 행</Label>
            <Input
              type="number"
              min="1"
              placeholder="ex) 1"
              value={form.headerRow}
              onChange={(e) => set("headerRow", e.target.value)}
            />
          </div>
          <div>
            <Label required>시작 행</Label>
            <Input
              type="number"
              min="1"
              placeholder="ex) 3"
              value={form.startRow}
              onChange={(e) => set("startRow", e.target.value)}
            />
          </div>
          <div>
            <Label required>종료 행</Label>
            <Input
              type="number"
              min="1"
              placeholder="ex) 100"
              value={form.endRow}
              onChange={(e) => set("endRow", e.target.value)}
            />
          </div>
        </div>

        {/* 컬럼 설정 */}
        <SectionTitle>컬럼 설정</SectionTitle>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div>
            <Label required>채널명 컬럼</Label>
            <Input
              placeholder="채널명"
              value={form.channelNameColumn}
              onChange={(e) => set("channelNameColumn", e.target.value)}
            />
          </div>
          <div>
            <Label required>Apple ID 컬럼</Label>
            <Input
              placeholder="애플 ID"
              value={form.appleIdColumn}
              onChange={(e) => set("appleIdColumn", e.target.value)}
            />
          </div>
          <div>
            <Label required>RSS 컬럼</Label>
            <Input
              placeholder="RSS"
              value={form.rssColumn}
              onChange={(e) => set("rssColumn", e.target.value)}
            />
          </div>
        </div>

        {/* 기타 설정 */}
        <SectionTitle>기타 설정</SectionTitle>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <Label>국가 코드</Label>
            <Input
              placeholder="ex) US, KR, JP"
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 justify-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.overwrite}
                onChange={(e) => set("overwrite", e.target.checked)}
                className="w-4 h-4 rounded accent-key-color"
              />
              <span className="text-sm text-slate-400">덮어쓰기</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.returnFile}
                onChange={(e) => set("returnFile", e.target.checked)}
                className="w-4 h-4 rounded accent-key-color"
              />
              <span className="text-sm text-slate-400">파일로 반환</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-key-color hover:bg-dark-key-color text-white font-semibold py-2.5 rounded-xl transition-all text-m cursor-pointer"
        >
          분석 시작
        </button>
      </div>

      {/* 결과 */}
      {submitted && (
        <div className="mt-6 bg-white border border-white/[0.07] rounded-2xl p-6">
          <div className="text-[11px] font-mono text-slate-600 tracking-widest uppercase mb-4">
            Results
          </div>
          <div className="text-sm text-slate-400">
            API 연동 후 결과가 여기에 표시됩니다.
          </div>
        </div>
      )}
    </div>
  );
};
