import Container from "@/components/container";
import { Navbar1 } from "@/components/navbar";
import { fetchProductBySlug } from "@/services/product-service";
import ProductDetailsClient from "../ProductDetailsClient";
interface DetailProductProps {
  params: { slug: string };
}

export default async function DetailProduct({ params }: DetailProductProps) {
  // 1. Ambil data langsung di server
  const product = await fetchProductBySlug(params.slug);

  // 2. Handle jika produk tidak ditemukan
  if (!product) {
    return (
      <Container>
        <Navbar1 />
        <div className="flex items-center justify-center min-h-screen">
          Produk tidak ditemukan
        </div>
      </Container>
    );
  }

  // 3. Render komponen client dengan data dari server
  return (
    <Container>
      <Navbar1 />
      <ProductDetailsClient product={product} />
    </Container>
  );
}
