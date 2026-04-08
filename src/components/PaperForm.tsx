import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PaperForm = ({ paperInfo, setPaperInfo }) => {
  const handleChange = (field, value) => {
    setPaperInfo((prev) => ({ ...prev, [field]: value }));
  };
  const formatInputDate = (value) => {
    if (!value) return "";

    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">Paper Details</h2>

      <div className="grid grid-cols-1 gap-3">
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Exam Name</Label>
          <Input
            value={paperInfo.examName}
            onChange={(e) => handleChange("examName", e.target.value)}
            placeholder="e.g. Annual Examination 2025"
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject</Label>
          <Input
            value={paperInfo.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            placeholder="e.g. Computer Science"
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</Label>
            <Input
              type="date"
              value={paperInfo.rawDate}
              onChange={(e) => {
                const raw = e.target.value;

                setPaperInfo({
                  ...paperInfo,
                  rawDate: raw,
                  date: formatInputDate(raw), // 👈 yaha convert
                });
              }}
            />
          </div>
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Time</Label>
            <Input
              value={paperInfo.time}
              onChange={(e) => handleChange("time", e.target.value)}
              placeholder="e.g. 10:00 AM - 1:00 PM"
              className="mt-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Class</Label>
            <Input
              value={paperInfo.className}
              onChange={(e) => handleChange("className", e.target.value)}
              placeholder="e.g. XII"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Marks</Label>
            <Input
              type="number"
              value={paperInfo.totalMarks}
              onChange={(e) => handleChange("totalMarks", e.target.value)}
              placeholder="e.g. 80"
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperForm;
