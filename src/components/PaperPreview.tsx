const PaperPreview = ({ paperInfo, sections }) => {

  const formatClassName = (value) => {
    if (!value) return "";

    const match = value.match(/^(\d+)(st|nd|rd|th)?\s*(.*)$/i);
    if (!match) return value;

    const number = match[1];
    const suffix = match[2] || "th";
    const rest = match[3];

    return (
      <>
        {number}
        <sup className="text-[6px] sm:text-[8px] align-super">{suffix}</sup>{rest}
      </>
    );
  };

  return (
    <div className="w-full px-1 sm:px-2">
      <div className="w-full max-w-[800px] mx-auto">

        <div
          className="print-area bg-paper border border-paper-border rounded-lg p-1 sm:p-2 shadow-sm min-h-[500px] sm:min-h-[600px]"
          style={{ fontFamily: "Cambria, Georgia, serif" }}
        >

          {/* Header */}
          <div className="flex -mt-1 sm:-mt-2 px-1 sm:px-2 justify-between items-center border-b-2 sm:border-b-4 border-foreground">

            {/* LEFT */}
            <div className="flex flex-col text-[10px] sm:text-[15px]">
              <img src="/logos/logo1.png" className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]" />
              <div>
                {paperInfo.date && <p><b>Date:</b> {paperInfo.date}</p>}
                {paperInfo.time && <p><b>Time:</b> {paperInfo.time}</p>}
              </div>
            </div>

            {/* CENTER */}
            <div className="text-center">
              <div className="text-[12px] sm:text-[22px] font-bold">TAPI EDUCATION ACADAMY</div>
              <div className="text-[11px] sm:text-[20px] font-bold -mt-1 sm:-mt-2">
                P.P.SAVANI VIDHYAMANDIR
              </div>

              {paperInfo.examName && (
                <div className="text-[10px] sm:text-base -mt-1 sm:-mt-2">
                  {paperInfo.examName}
                </div>
              )}

              {paperInfo.subject && (
                <div className="text-[10px] sm:text-base -mt-1">
                  <b>SUBJECT:</b> {paperInfo.subject}
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="text-[10px] sm:text-[15px] text-right">
              <img src="/logos/logo2.png" className="w-[40px] h-[35px] sm:w-[60px] sm:h-[50px] ml-auto" />

              <div className="mt-1 sm:mt-2">
                {paperInfo.className &&
                  <p><b>Class:</b> {formatClassName(paperInfo.className)}</p>
                }

                {paperInfo.totalMarks &&
                  <p><b>Total Marks:</b> {paperInfo.totalMarks}</p>
                }
              </div>
            </div>

          </div>

          {/* Questions */}
          <div className="space-y-2 sm:space-y-4 mt-2 sm:mt-3 px-1 sm:px-3">
            {sections.map((section, sIdx) => (
              <div key={section.id}>

                {/* Section Heading */}
                <div className="flex justify-between">
                  <h3 className="font-bold text-[12px] sm:text-[16px] flex w-full">
                    <span className="mr-1 sm:mr-2 shrink-0">Q{sIdx + 1}.</span>

                    <span className="break-words whitespace-normal w-[180px] sm:w-[28rem]">
                      {section.heading}

                      {section.attemptNote && (
                        <span className="ml-1 sm:ml-2 text-[10px] sm:text-sm font-normal">
                          ({section.attemptNote})
                        </span>
                      )}
                    </span>
                  </h3>

                  {section.marks && (
                    <span className="text-[10px] sm:text-sm font-semibold">
                      [{section.marks}]
                    </span>
                  )}
                </div>

                {/* Questions */}
                <div className="pl-4 sm:pl-8 mt-1">
                  {section.questions.map((q, qIdx) => (
                    <div key={q.id} className="mb-1 sm:mb-2">

                      {/* Main Question */}
                      {q.text && (
                        <p className="flex text-[11px] sm:text-base">
                          <span className="font-semibold shrink-0">
                            {qIdx + 1}.
                          </span>

                          <span className="break-words whitespace-normal w-[180px] sm:w-[28rem]">
                            {q.text}
                          </span>
                        </p>
                      )}

                      {/* OR Questions */}
                      {q.alternatives?.length > 0 && (
                        <div>
                          {q.alternatives.map((alt) => (
                            alt.text && (
                              <div key={alt.id}>
                                <p className="text-[10px] sm:text-sm font-semibold ml-6 sm:ml-10">
                                  OR
                                </p>

                                <p className="flex text-[11px] sm:text-base">
                                  <span className="font-semibold pr-1 sm:pr-2">
                                    {qIdx + 1}.
                                  </span>

                                  <span className="break-words whitespace-normal w-[180px] sm:w-[28rem]">
                                    {alt.text}
                                  </span>
                                </p>
                              </div>
                            )
                          ))}
                        </div>
                      )}

                      {/* MCQ Options */}
                      {q.options.length > 0 && q.options.some((o) => o) && (
                        <div className="grid grid-cols-2 gap-1 pl-3 sm:pl-6 mt-1 text-[10px] sm:text-sm">
                          {q.options.map((opt, oIdx) => (
                            opt && (
                              <p key={oIdx}>
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
            <div className="text-center mt-6 sm:mt-10 text-gray-400 text-xs sm:text-base">
              Add sections to preview
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PaperPreview;