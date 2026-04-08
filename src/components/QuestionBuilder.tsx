import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, GripVertical } from "lucide-react";

const QuestionBuilder = ({ sections, setSections }) => {

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: Date.now(),
        heading: "",
        marks: "",
        attemptNote: "",
        questions: [
          { id: Date.now() + 1, text: "", options: [], alternatives: [] }
        ],
      },
    ]);
  };

  const updateSection = (sectionId, field, value) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, [field]: value } : s))
    );
  };

  const removeSection = (sectionId) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  };

  const addQuestion = (sectionId) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questions: [
                ...s.questions,
                { id: Date.now(), text: "", options: [], alternatives: [] }
              ],
            }
          : s
      )
    );
  };

  const updateQuestion = (sectionId, questionId, field, value) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questions: s.questions.map((q) =>
                q.id === questionId ? { ...q, [field]: value } : q
              ),
            }
          : s
      )
    );
  };

  const removeQuestion = (sectionId, questionId) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, questions: s.questions.filter((q) => q.id !== questionId) }
          : s
      )
    );
  };

  // 🔥 MCQ
  const toggleMCQ = (sectionId, questionId) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questions: s.questions.map((q) =>
                q.id === questionId
                  ? {
                      ...q,
                      options: q.options.length > 0 ? [] : ["", "", "", ""],
                    }
                  : q
              ),
            }
          : s
      )
    );
  };

  const updateOption = (sectionId, questionId, optionIndex, value) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questions: s.questions.map((q) =>
                q.id === questionId
                  ? {
                      ...q,
                      options: q.options.map((o, i) =>
                        i === optionIndex ? value : o
                      ),
                    }
                  : q
              ),
            }
          : s
      )
    );
  };

  // 🔥 OR
  const addAlternative = (sectionId, questionId) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questions: s.questions.map((q) =>
                q.id === questionId
                  ? {
                      ...q,
                      alternatives: [
                        ...q.alternatives,
                        { id: Date.now(), text: "" }
                      ],
                    }
                  : q
              ),
            }
          : s
      )
    );
  };

  const updateAlternative = (sectionId, questionId, altId, value) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questions: s.questions.map((q) =>
                q.id === questionId
                  ? {
                      ...q,
                      alternatives: q.alternatives.map((a) =>
                        a.id === altId ? { ...a, text: value } : a
                      ),
                    }
                  : q
              ),
            }
          : s
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">
          Questions
        </h2>
        <Button onClick={addSection} size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add Section
        </Button>
      </div>

      {sections.map((section, sIdx) => (
  <div key={section.id} className="rounded-lg border bg-card p-3 sm:p-4 space-y-2 sm:space-y-3">
    
    <div className="flex items-start gap-1 sm:gap-2">
      <GripVertical className="h-4 w-4 sm:h-5 sm:w-5 mt-2 text-muted-foreground shrink-0" />

      <div className="flex-1 space-y-2 sm:space-y-3">

        {/* Section Heading */}
        <div className="flex gap-1 sm:gap-2">
          <div className="flex-1">
            <Label className="text-xs sm:text-sm">Section Heading</Label>
            <Input
              className="h-8 sm:h-10 text-xs sm:text-sm"
              value={section.heading}
              onChange={(e) =>
                updateSection(section.id, "heading", e.target.value)
              }
            />
          </div>

          <div className="w-16 sm:w-20">
            <Label className="text-xs sm:text-sm">Marks</Label>
            <Input
              className="h-8 sm:h-10 text-xs sm:text-sm"
              value={section.marks}
              onChange={(e) =>
                updateSection(section.id, "marks", e.target.value)
              }
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-2 pl-1 sm:pl-2 border-l-2 border-primary/20">
          {section.questions.map((q, qIdx) => (
            <div key={q.id} className="space-y-2 rounded bg-muted/50 p-2 sm:p-3">

              {/* Main Question */}
              <div className="flex gap-1 sm:gap-2 items-start">
                <span className="text-xs sm:text-sm font-semibold mt-2 shrink-0">
                  {qIdx + 1}.
                </span>

                <div className="flex-1">
                  <Textarea
                    className="text-xs sm:text-sm"
                    value={q.text}
                    onChange={(e) =>
                      updateQuestion(section.id, q.id, "text", e.target.value)
                    }
                    placeholder="Enter question text..."
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-1">
                  <Button
                    className="text-[10px] sm:text-xs px-2 py-1 h-7 sm:h-8"
                    variant={q.options.length > 0 ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleMCQ(section.id, q.id)}
                  >
                    MCQ
                  </Button>

                  <Button
                    className="text-[10px] sm:text-xs px-2 py-1 h-7 sm:h-8"
                    variant="outline"
                    size="sm"
                    onClick={() => addAlternative(section.id, q.id)}
                  >
                    OR
                  </Button>

                  <Button
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuestion(section.id, q.id)}
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>

              {/* OR Questions */}
              {q.alternatives.map((alt) => (
                <div key={alt.id} className="pl-4 sm:pl-6">
                  <p className="text-[10px] sm:text-xs font-semibold">OR</p>
                  <Textarea
                    className="text-xs sm:text-sm"
                    value={alt.text}
                    onChange={(e) =>
                      updateAlternative(section.id, q.id, alt.id, e.target.value)
                    }
                    placeholder="Alternative question..."
                  />
                </div>
              ))}

              {/* MCQ Options */}
              {q.options.length > 0 && (
                <div className="grid grid-cols-2 gap-1 sm:gap-2 pl-4 sm:pl-6">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-1">
                      <span className="text-[10px] sm:text-xs font-semibold w-3 sm:w-4">
                        {String.fromCharCode(65 + oIdx)}.
                      </span>
                      <Input
                        className="h-7 sm:h-9 text-xs sm:text-sm"
                        value={opt}
                        onChange={(e) =>
                          updateOption(section.id, q.id, oIdx, e.target.value)
                        }
                        placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                      />
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}

          <Button
            className="text-xs sm:text-sm px-2 py-1 h-8 sm:h-9"
            onClick={() => addQuestion(section.id)}
          >
            <Plus className="h-3 w-3" /> Add Question
          </Button>
        </div>
      </div>

      {/* Delete Section */}
      <Button
        className="h-7 w-7 sm:h-9 sm:w-9 p-0"
        onClick={() => removeSection(section.id)}
      >
        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </div>
  </div>
))}
    </div>
  );
};

export default QuestionBuilder;