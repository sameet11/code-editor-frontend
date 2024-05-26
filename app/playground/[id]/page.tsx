import Splitscreen from "@/app/component/splitscreen";

const PlaygroundView = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Splitscreen id={params.id} />
    </>
  );
};

export default PlaygroundView;
