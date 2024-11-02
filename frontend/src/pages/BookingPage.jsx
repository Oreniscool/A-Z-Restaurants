import { useParams } from 'react-router-dom';

const BookingPage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="bg-white w-full rounded-[2.5rem] flex flex-col p-10">
      BookingPage
    </div>
  );
};

export default BookingPage;
