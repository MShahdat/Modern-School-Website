

const TuitionFee = () => {

  return (
    <div className="bg-white dark:bg-black/80">
      <div className="max-w-7xl px-4 py-8 mx-auto">
        <h3 className="text-3xl dark:text-white/90 md:text-4xl font-bold text-blue-900 text-center mb-4">
          Tuition Fees
        </h3>
        <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />
        {/* <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-lg mb-8">
            <thead className="bg-blue-950 text-white text-center">
              <tr>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-left text-lg font-bold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center">
              {rows.map((cells, rIdx) => (
                <tr
                  key={rIdx}
                  className={`${rIdx % 2 === 0 ? "bg-white" : "bg-gray-200"
                    } hover:bg-indigo-200`}
                >
                  {cells.map((c, cIdx) => (
                    <td
                      key={cIdx}
                      className="px-6 py-5 text-lg font-semibold text-gray-700 border-b border-gray-200"
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default TuitionFee;
