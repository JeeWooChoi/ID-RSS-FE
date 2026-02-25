import type { PodcastResult } from "@/entities/podcast/types";
import { manualAppleIdApi } from "@/features/manual-lookup/api/manualAppleIdApi";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { ResultTable } from "@/shared/ui/ResultTable";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { handleApiError } from "@/shared/utils/handleApiError";
import { useEffect, useState } from "react";

interface FormState {
  appleId: string;
  country?: string;
}

const STORAGE_KEY = "manualAppleIdForm";

const INITIAL_FORM: FormState = {
  appleId: "",
  country: "",
};

const getInitialForm = (): FormState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return INITIAL_FORM;

  try {
    return {
      ...INITIAL_FORM,
      ...JSON.parse(saved),
    };
  } catch {
    return INITIAL_FORM;
  }
};

export const ManualAppleIdPage = () => {
  const [form, setForm] = useState<FormState>(getInitialForm);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<PodcastResult[]>([]);

  // form 변경될 때 자동 저장
  useEffect(() => {
    const formToSave = { ...form };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formToSave));
  }, [form]);

  const set = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmitJson = async () => {
    if (!form.appleId) return alert("Apple ID를 입력해주세요.");

    try {
      const data = await manualAppleIdApi({ ...form });
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
    });
  };

  return (
    <div className="flex flex-col max-w-[95%] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-100 mb-1">
          수동 Apple ID로 검색
        </h2>
        <p className="text-m text-gray-400">
          수동으로 입력한 Apple ID를 기준으로 RSS URL을 반환합니다.
        </p>
      </div>

      <div className="px-10">
        {/* 컬럼 설정 */}
        <SectionTitle>조회 조건</SectionTitle>
        <div className="grid grid-cols-2 gap-3 mb-16">
          <div>
            <Label required>Apple ID</Label>
            <Input
              placeholder="ex) id123456789"
              value={form.appleId}
              onChange={(e) => set("appleId", e.target.value)}
            />
          </div>
          <div>
            <Label>국가 코드</Label>
            <Input
              placeholder="ex) US, KR, JP"
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
            />
          </div>
        </div>
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
      {submitted && results && (
        <div className="mt-6 px-10">
          <SectionTitle>결과</SectionTitle>
          <ResultTable
            results={results}
            fileName={`result_${form.appleId ?? "result"}.xlsx`}
            type="manualAppleId"
          />
        </div>
      )}
    </div>
  );
};
