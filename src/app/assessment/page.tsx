import { Header } from "@/components/layout/Header";
import { AssessmentFlow } from "./AssessmentFlow";

export const metadata = {
  title: "Free Cyber Risk Check – ClearRisk",
  description: "Answer 10 plain-language questions and get a clear picture of your cyber risk in under 5 minutes.",
};

export default function AssessmentPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1F2937] mb-2">
            Your Cyber Risk Check
          </h1>
          <p className="text-[#6B7280]">
            Answer honestly — there are no wrong answers, just a clearer picture.
          </p>
        </div>
        <AssessmentFlow />
      </main>
    </>
  );
}
