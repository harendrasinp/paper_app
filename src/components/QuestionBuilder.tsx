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
        questions: [{ id: Date.now() + 1, text: "", options: [] }],
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
          ? { ...s, questions: [...s.questions, { id: Date.now(), text: "", options: [] }] }
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
                      options:
                        q.options.length > 0 ? [] : ["", "", "", ""],
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">Questions</h2>
        <Button onClick={addSection} size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add Section
        </Button>
      </div>

      {sections.map((section, sIdx) => (
        <div
          key={section.id}
          className="rounded-lg border bg-card p-4 space-y-3"
        >
          <div className="flex items-start gap-2">
            <GripVertical className="h-5 w-5 mt-2 text-muted-foreground shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Section Heading
                  </Label>
                  <Input
                    value={section.heading}
                    onChange={(e) => updateSection(section.id, "heading", e.target.value)}
                    placeholder={`e.g. Q${sIdx + 1}. MCQ Based Questions`}
                    className="mt-1"
                  />
                </div>
                <div className="w-20">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Marks</Label>
                  <Input
                    value={section.marks}
                    onChange={(e) => updateSection(section.id, "marks", e.target.value)}
                    placeholder="e.g. 1"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Attempt Note (optional)
                </Label>
                <Input
                  value={section.attemptNote}
                  onChange={(e) => updateSection(section.id, "attemptNote", e.target.value)}
                  placeholder="e.g. Attempt any 5"
                  className="mt-1"
                />
              </div>

              <div className="space-y-2 pl-2 border-l-2 border-primary/20">
                {section.questions.map((q, qIdx) => (
                  <div key={q.id} className="space-y-2 rounded bg-muted/50 p-3">
                    <div className="flex gap-2 items-start">
                      <span className="text-sm font-semibold text-muted-foreground mt-2 shrink-0">
                        {qIdx + 1}.
                      </span>
                      <div className="flex-1">
                        <Textarea
                          value={q.text}
                          onChange={(e) => updateQuestion(section.id, q.id, "text", e.target.value)}
                          placeholder="Enter question text..."
                          rows={2}
                          className="resize-none"
                        />
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button
                          variant={q.options.length > 0 ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleMCQ(section.id, q.id)}
                          className="text-xs"
                        >
                          MCQ
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(section.id, q.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {q.options.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 pl-6">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-1">
                            <span className="text-xs font-semibold text-muted-foreground w-4">
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            <Input
                              value={opt}
                              onChange={(e) => updateOption(section.id, q.id, oIdx, e.target.value)}
                              placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                              className="h-8 text-sm"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addQuestion(section.id)}
                  className="gap-1 text-xs"
                >
                  <Plus className="h-3 w-3" /> Add Question
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeSection(section.id)}
              className="text-destructive shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionBuilder;
