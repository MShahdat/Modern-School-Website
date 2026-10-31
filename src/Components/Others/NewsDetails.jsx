
import { useParams } from "react-router-dom";


const NewsDetails = () => {
  const { id } = useParams();

  return (
    <div className=" bg-white/95 dark:bg-black/80">
      <div className="p-8 max-w-7xl mx-auto">
        <h3 className="text-2xl dark:text-white/90 md:text-4xl font-bold text-center text-indigo-800 mb-4">
          News Details
        </h3>
        <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />
      </div>
    </div>
  );
};

export default NewsDetails;
