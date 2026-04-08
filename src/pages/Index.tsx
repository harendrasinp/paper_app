import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, FileText } from "lucide-react";
import PaperForm from "@/components/PaperForm";
import QuestionBuilder from "@/components/QuestionBuilder";
import PaperPreview from "@/components/PaperPreview";
import html2pdf from "html2pdf.js"
const Index = () => {
const downloadPDF = () => {
  const element = document.querySelector(".print-area");

  const opt = {
    margin: 10,
    filename: "question-paper.pdf",
    image: { type: "jpeg" as const, quality: 1 }, // ✅ fix
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };
// @ts-ignore
  html2pdf().set(opt).from(element).save();
};
  const [paperInfo, setPaperInfo] = useState({
    schoolName: "",
    examName: "",
    subject: "",
    rawDate: "",   // 👈 input ke liye
    date: "",      // 👈 formatted display ke liye
    time: "",
    className: "",
    totalMarks: "",
  });

  const [sections, setSections] = useState([]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="no-print sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="font-display text-lg font-bold text-foreground">
              Question Paper Generator
            </h1>
          </div>
          <div className="mb-3 text-right">
            <Button onClick={downloadPDF}>
              Download PDF
            </Button>
          </div>
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" /> Print Paper
          </Button>
        </div>
      </header>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="no-print space-y-6 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto lg:pr-4">
            <PaperForm paperInfo={paperInfo} setPaperInfo={setPaperInfo} />
            <QuestionBuilder sections={sections} setSections={setSections} />
          </div>

          {/* Right: Preview */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <h2 className="no-print font-display text-xl font-bold text-foreground mb-3">
              Live Preview
            </h2>
            <PaperPreview paperInfo={paperInfo} sections={sections} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
