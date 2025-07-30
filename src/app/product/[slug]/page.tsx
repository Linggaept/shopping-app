"use client";
import { useEffect, useState } from "react";
import { useProduct } from "@/store/useProduct";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Navbar1 } from "@/components/navbar";
import Container from "@/components/container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DetailProductProps {
  params: Promise<{ slug: string }>;
}

export default function DetailProduct({ params }: DetailProductProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const { fetchProductBySlug, products, loading } = useProduct();
  const router = useRouter();
  
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // Resolve params Promise
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    
    getParams();
  }, [params]);

  // Handle authentication and product loading
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    const loadProduct = async () => {
      if (slug) {
        try {
          await fetchProductBySlug(slug);
        } catch (error) {
          console.error('Error loading product:', error);
        }
      }
    };
    
    loadProduct();
  }, [slug, fetchProductBySlug, router]);

  if (loading) {
    return (
      <Container>
        <Navbar1 />
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      </Container>
    );
  }

  const product = products[0];
  if (!product) {
    return (
      <Container>
        <Navbar1 />
        <div className="flex items-center justify-center min-h-screen">
          Product not found
        </div>
      </Container>
    );
  }

  const defaultProductImage = product.images[0] || null;
  const currentImage = selectedImage || defaultProductImage;

  return (
    <Container>
      <Navbar1 />
      <div className="grid gap-6 lg:gap-12 max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-sm font-medium leading-none hover:underline">
            Home
          </Link>
          <ChevronRightIcon className="w-4 h-4 flex-shrink-0 fill-muted-foreground" />
          <Link href="/products" className="text-sm font-medium leading-none hover:underline">
            Products
          </Link>
          <ChevronRightIcon className="w-4 h-4 flex-shrink-0 fill-muted-foreground" />
          <p className="text-sm font-medium leading-none">
            {product.category?.name}
          </p>
        </div>

        {/* Product Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Product Images */}
          <div className="grid md:grid-cols-5 gap-3 items-start">
            <div className="hidden md:flex flex-col gap-3 items-start">
              {product.images?.map((image, index) => (
                image && (
                  <button 
                    key={index} 
                    className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50" 
                    onClick={() => handleImageClick(image)}
                  >
                    <Image
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      width={100}
                      height={120}
                      className="aspect-[5/6] object-cover"
                    />
                  </button>
                )
              ))}
            </div>

            <div className="md:col-span-4">
              {currentImage && (
                <Image
                  src={currentImage}
                  alt={product.title}
                  width={600}
                  height={900}
                  className="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                />
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="grid gap-4 md:gap-10 items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-4xl">{product.title}</h1>
              <div className="text-3xl font-bold">${product.price}</div>
            </div>

            <form className="grid gap-4 md:gap-8">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Select defaultValue="1">
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">Add to cart</Button>
                <Button size="lg" variant="outline">
                  <HeartIcon className="w-4 h-4 mr-2" />
                  Add to wishlist
                </Button>
              </div>
            </form>

            <Separator />

            <div className="grid gap-4 text-sm leading-loose">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}