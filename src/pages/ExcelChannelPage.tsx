import type { PodcastResult } from "@/entities/podcast/types";
import { excelChannelApi } from "@/features/excel-upload/api/excelChannelApi";
import { ExcelFormFields } from "@/features/excel-upload/ui/ExcelFormFields";
import { FileUploadZone } from "@/features/excel-upload/ui/FileUploadZone";
import { ResultTable } from "@/shared/ui/ResultTable";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { handleApiError } from "@/shared/utils/handleApiError";
import { useEffect, useState } from "react";

interface FormState {
  sheetName: string;
  startRow: string;
  endRow: string;
  headerRow: string;
  channelNameColumn: string;
  appleIdColumn: string;
  rssColumn: string;
  country: string;
  file?: File | null;
}

const STORAGE_KEY = "excelChannelForm";

const INITIAL_FORM: FormState = {
  sheetName: "",
  startRow: "",
  endRow: "",
  headerRow: "",
  channelNameColumn: "채널명",
  appleIdColumn: "애플 ID",
  rssColumn: "RSS",
  country: "",
  file: null,
};

const getInitialForm = (): FormState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return INITIAL_FORM;

  try {
    return {
      ...INITIAL_FORM,
      ...JSON.parse(saved),
      file: null,
    };
  } catch {
    return INITIAL_FORM;
  }
};

export const ExcelChannelPage = () => {
  const [form, setForm] = useState<FormState>(getInitialForm);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<PodcastResult[]>([]);

  // form 변경될 때 자동 저장 (file 제외)
  useEffect(() => {
    const formToSave = { ...form };
    delete formToSave.file;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formToSave));
  }, [form]);

  const set = (key: keyof FormState, value: string | File | null) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmitJson = async () => {
    if (!form.file) return alert("파일을 업로드해주세요.");

    try {
      const data = await excelChannelApi({ ...form, file: form.file });
      setResults(data);
      setSubmitted(true);
    } catch (error) {
      alert(handleApiError(error));
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setForm({
      ...INITIAL_FORM,
      file: null,
    });
  };

  return (
    <div className="flex flex-col max-w-[95%] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-100 mb-1">
          엑셀 → 채널명으로 검색
        </h2>
        <p className="text-m text-gray-400">
          엑셀 파일의 채널명 컬럼을 읽어 Apple ID와 RSS URL을 반환합니다.
        </p>
      </div>

      <div className="px-10">
        {/* 파일 업로드 */}
        <SectionTitle>파일</SectionTitle>
        <FileUploadZone
          file={form.file ?? null} // undefined면 null로 변환
          onFile={(f) => set("file", f)}
          onClear={() => set("file", null)}
        />
        {/* 시트 설정 */}
        <ExcelFormFields
          form={form}
          set={(key, value) => set(key as keyof FormState, value)}
        />

        {/* 버튼 영역 */}
        <div className="flex gap-3">
          <button
            onClick={handleSubmitJson}
            className="flex-1 bg-key-color hover:bg-light-key-color text-white font-semibold px-5 py-4 rounded-xl transition-all text-sm cursor-pointer"
          >
            분석 시작
          </button>

          <button
            onClick={handleReset}
            className="px-5 bg-gray-600 hover:bg-gray-500 text-white rounded-xl text-sm transition-all cursor-pointer"
          >
            설정 초기화
          </button>
        </div>
      </div>

      {/* 결과 */}
      {submitted && results.length > 0 && (
        <div className="mt-6 px-10">
          <SectionTitle>결과</SectionTitle>
          <ResultTable
            results={results}
            fileName={`result_${form.file?.name ?? "result.xlsx"}`}
          />
        </div>
      )}
    </div>
  );
};
