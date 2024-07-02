import { Navbar, Container, Footer } from "../Components/compIndex";

const Home = () => {
  const testLogHistory =
    JSON.parse(window.localStorage.getItem("calculatedHistory")) || [];
  console.log("testLogHistory", testLogHistory);
  return (
    <>
      <Navbar />
      <Container />
      <Footer />
    </>
  );
};

export default Home;
