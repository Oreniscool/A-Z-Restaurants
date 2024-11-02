import { Card, CardHeader, CardBody, Button } from '@nextui-org/react';
import { useParams, useNavigate } from 'react-router-dom';
const ReserveCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Card className="p-10">
      <CardHeader>Seating information</CardHeader>
      <CardBody>
        <Button onClick={() => navigate(`/dashboard/book/${id}`)}>Book</Button>
      </CardBody>
    </Card>
  );
};

export default ReserveCard;
