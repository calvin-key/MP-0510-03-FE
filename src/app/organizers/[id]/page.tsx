import OrganizerDetailPage from "@/features/organizer";

const organizerDetail = ({ params }: { params: { id: string } }) => {
  return <OrganizerDetailPage organizerId={Number(params.id)} />;
};

export default organizerDetail;
