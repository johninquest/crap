import { Header } from "@/components/layout/Header";
import { ResultsView } from "./ResultsView";
import { BRAND } from "@/lib/config";

export const metadata = {
  title: `Your Results – ${BRAND.name}`,
  description: "Your personalised cyber risk score and recommended next steps.",
};

export default function ResultPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1F2937] mb-2">Your Results</h1>
          <p className="text-[#6B7280]">
            Here&apos;s a clear picture of your cyber risk — and exactly what to do about it.
          </p>
        </div>
        <ResultsView />
      </main>
    </>
  );
}
