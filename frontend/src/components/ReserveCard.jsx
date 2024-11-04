import { Card, CardHeader, CardBody, Button } from '@nextui-org/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
const ReserveCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Card className="p-10">
      <CardHeader className="text-text-500">Seating information</CardHeader>
      <CardBody className="flex flex-col gap-5">
        <Button onClick={() => navigate(`/dashboard/book/${id}`)}>Book</Button>
      </CardBody>
    </Card>
  );
};

export default ReserveCard;
