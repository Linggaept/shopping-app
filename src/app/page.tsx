import Container from "@/components/container";
import { Navbar1 } from "@/components/navbar";
import ProductList from "./product-list";

export default function Home() {
  return (
    <Container admin={false}>
      <Navbar1 />
      <ProductList />
    </Container>
  );
}
