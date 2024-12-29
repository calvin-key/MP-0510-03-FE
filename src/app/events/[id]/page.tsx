import EventDetailPage from "@/features/event/EventDetailPage";

const eventDetail = ({ params }: { params: { id: string } }) => {
  return <EventDetailPage eventId={Number(params.id)}/>;
};

export default eventDetail;
