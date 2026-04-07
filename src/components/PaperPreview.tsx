const PaperPreview = ({ paperInfo, sections }) => {
  return (
    <div className="print-area bg-paper border border-paper-border rounded-lg p-2 shadow-sm min-h-[600px]"
    style={{ fontFamily: "Cambria, Georgia, serif" }}>
      {/* Header */}
      <div className="flex justify-between items-end text-center  border-b-2 border-foreground mb-2">
        {/* --------------------------------------header part1---------------------------- */}
        <div className="flex flex-col text-[12px]">
          <div className="w-[80px] h-[80px]"><img src="/logos/logo1.png" alt="Logo" className="w-full h-full"  /></div>
          <div className="text-left ">
            {paperInfo.date && <p><span className="font-semibold">Date:</span> {paperInfo.date}</p>}
            {paperInfo.time && <p><span className="font-semibold">Time:</span> {paperInfo.time}</p>}
          </div>
        </div>
        {/* --------------------------------------header part2---------------------------- */}
        <div>
          <div className="text-[26px] font-bold">TAPI EDUCATION ACADAMY</div>
          <div className="text-[25px] font-bold">P.P.SAVANI VIDHYAMANDIR</div>
          {paperInfo.examName && (
            <p className="text-[20px] font-semibold">{paperInfo.examName}</p>
          )}
          {paperInfo.subject && <p className=" text-[18px]"><span className="font-semibold" >SUBJECT:</span> {paperInfo.subject}</p>}
        </div>
        {/* --------------------------------------header part3---------------------------- */}
        <div className="text-right text-[12px] flex flex-col items-end">
          <div className="w-[80px] h-[80px]"><img src="/logos/logo2.png" alt="Logo" className="w-full"  /></div>
          <div className="flex flex-col justify-cente items-start">
            {paperInfo.className && <p><span className="font-semibold">Class:</span> {paperInfo.className}<sup>th</sup></p>}
            {paperInfo.totalMarks && <p><span className="font-semibold">Total Marks:</span> {paperInfo.totalMarks}</p>}
          </div>
        </div>
      </div>

      {/* Instructions */}

      {/* Questions */}
      <div className="space-y-5">
        {sections.map((section, sIdx) => (
          <div key={section.id}>
            {/* Section heading */}
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-[12px]">
                {section.heading || `Q${sIdx + 1}.`}
                {section.attemptNote && (
                  <span className="ml-2 font-normal text-sm text-foreground/60">
                    ({section.attemptNote})
                  </span>
                )}
              </h3>
              {section.marks && (
                <span className="text-sm font-semibold text-foreground/70">
                  [{section.marks}]
                </span>
              )}
            </div>

            {/* Questions in this section */}
            <div className="space-y-3 pl-4">
              {section.questions.map((q, qIdx) => (
                <div key={q.id}>
                  {q.text && (
                    <p className="text-sm text-foreground/90">
                      <span className="font-semibold">{qIdx + 1}.</span> {q.text}
                    </p>
                  )}
                  {q.options.length > 0 && q.options.some((o) => o) && (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 pl-5 mt-1">
                      {q.options.map((opt, oIdx) => (
                        opt && (
                          <p key={oIdx} className="text-sm text-foreground/80">
                            {String.fromCharCode(65 + oIdx)}. {opt}
                          </p>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {sections.length === 0 && (
        <div className="flex items-center justify-center h-40 text-muted-foreground text-sm italic">
          Add sections and questions to see the preview
        </div>
      )}
    </div>
  );
};

export default PaperPreview;
