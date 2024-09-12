interface props {
  params: { id: string };
}

const ClientPage = ({ params: { id } }: props) => {
  return <div>ClientPage</div>;
};

export default ClientPage;
