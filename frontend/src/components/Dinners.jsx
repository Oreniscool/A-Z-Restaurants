/* eslint-disable react/prop-types */
import Restaurant from './Restaurant';
const Dinners = ({ heading, dinners, location, isLimited }) => {
  const len = isLimited ? 4 : dinners[0].length;
  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="text-2xl font-semibold">{heading}</h1>
      <div className="flex gap-4 overflow-auto p-5">
        {dinners
          .filter(
            (dinner) => dinner.city === (location ? location : dinner.city)
          )
          .slice(0, len)
          .map((dinner) => (
            <Restaurant key={dinner.r_id} dinner={dinner} />
          ))}
      </div>
    </div>
  );
};

export default Dinners;
