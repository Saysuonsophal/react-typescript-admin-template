"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  // Search,
  // ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  // Settings,
  // History,
  // FileText,
  // Star,
  // Building2,
  // Warehouse,
  CreditCard,
  QrCode,
  Minus,
  CircleX,
  ShoppingCart,
  Search,
  X,
} from "lucide-react";
import { useGetProduct } from "@/hooks/useCreateProduct";
import type { IProduct } from "@/components/types/products";
import { useCategories } from "@/hooks/useCategory";
import type { ICategory } from "@/components/types/category";
import { toast } from "sonner";
import type { ICart } from "@/components/types/cart";

import CheckoutDialog from "@/components/CheckoutDialog";

import { useCreateOrder } from "@/hooks/useOrder";
import type { OrderPayload } from "@/services/order.service";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
}

// interface OrderItem extends MenuItem {
//   quantity: number;
// }

// const menuItems: MenuItem[] = [
//   {
//     id: "1",
//     name: "Duck Salad",
//     category: "Pizza",
//     price: 35.0,
//     image: "/hat.jpeg",
//   },
//   {
//     id: "2",
//     name: "Breakfast board",
//     category: "Taco",
//     price: 14.0,
//     image: "/hat2.jpeg",
//   },
//   {
//     id: "3",
//     name: "Hummus",
//     category: "Sandwich",
//     price: 24.0,
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: "4",
//     name: "Roast beef",
//     category: "Kebab",
//     price: 17.5,
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: "5",
//     name: "Tuna salad",
//     category: "Popcorn",
//     price: 35.0,
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: "6",
//     name: "Salmon",
//     category: "Burger",
//     price: 48.0,
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: "7",
//     name: "California roll",
//     category: "Taco",
//     price: 74.0,
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: "8",
//     name: "Sashimi",
//     category: "Burrito",
//     price: 74.0,
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: "8",
//     name: "Sashimi",
//     category: "Burrito",
//     price: 74.0,
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: "8",
//     name: "Sashimi",
//     category: "Burrito",
//     price: 74.0,
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: "8",
//     name: "Sashimi",
//     category: "Burrito",
//     price: 74.0,
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: "8",
//     name: "Sashimi",
//     category: "Burrito",
//     price: 74.0,
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: "8",
//     name: "Sashimi",
//     category: "Burrito",
//     price: 74.0,
//     image: "/placeholder.svg?height=200&width=300",
//   },
// ];

export const PosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined,
  );
  const [orderItems, setOrderItems] = useState<ICart[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  //search Debound

  const [searchInput, setSearchInput] = useState("");
  const [search] = useDebounce(searchInput, 500);

  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  //fetch Product data from api
  const {
    data: productData,
    error: productError,
    isLoading: isProductLoading,
  } = useGetProduct(search, 1, 10, selectedCategory);

  //const isBackendDown = isFetched && !isFetched && productError;

  //fetch Category from api
  const {
    data: categoryData,
    error: categoryError,
    isLoading: isCategoryLoading,
  } = useCategories();

  //fetch Order data from api
  const { mutate: createOrderMutate, isPending } = useCreateOrder();
  const [modalState, setModalState] = useState("idle"); // "idle" | "loading" | "success" | "error"

  //const products = (productData?.data as IProduct[]) ?? [];

  const categories = (categoryData?.data as ICategory[]) ?? [];
  const [products, setProducts] = useState<IProduct[]>([]);

  // Sync local products state whenever API data changes (e.g. category filter)
  useEffect(() => {
    if (productData?.data) {
      const freshProducts = productData.data as IProduct[];

      // Re-apply cart deductions so stock stays accurate after category switch
      const adjusted = freshProducts.map((p) => {
        const cartItem = orderItems.find((item) => item.id === p.id);
        return cartItem ? { ...p, qty: p.qty - cartItem.qty } : p;
      });

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProducts(adjusted);
    }
  }, [productData, orderItems]);

  // ✅ FIX: Always use local state (kept in sync by useEffect above)
  const displayProducts = products;

  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [orderItems, setOrderItems] = useState([]);
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const draftNumber = 1;

  // Get order item(object) when user click adding order
  const addToCart = (product: IProduct) => {
    //logic: check stock availability
    if (product.qty <= 0) {
      toast.warning("Sorry, this item is out of stock.");
      return;
    }

    // Update stock after adding to order
    // ✅ FIX: Simplified — no fallback source needed
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty - 1 } : p)),
    );

    //Logic: Update order items state(old state(prev)) in Cart
    setOrderItems((prev) => {
      // exits item in order place
      const existingItem = prev.find(
        (orderItem) => orderItem.id === product.id,
      );

      // if item exists, check if quantity exceeds stock (Max stock)
      if (existingItem) {
        if (existingItem.qty >= existingItem.stock) {
          toast.warning("Product out of stock. Cannot add more to the order.");
          return prev; // No update to orderItems
        }

        // Update quantity if item already exists in order
        return prev.map((orderItem) =>
          orderItem.id === product.id
            ? { ...orderItem, qty: orderItem.qty + 1 }
            : orderItem,
        );
      }

      //Logic: Add new item quantity 1 if item does not exist in order
      return [
        ...prev,
        {
          id: product.id,
          category: product.category?.name ?? "UnCategory",
          name: product.name,
          price: Number(product.price),
          qty: 1,
          imageUrl: product.productImages?.[0]?.imageURL ?? "../assets/box.png",
          stock: product.qty,
        },
      ];
    });
  };

  // check stock availability before allowing QTY increase
  const getAvailableStock = (id: number): number => {
    return products.find((p) => p.id === id)?.qty ?? 0;
  };

  const increaseQty = (id: number) => {
    // Single source of truth: resolve the product list once, outside both setters

    const currentItem = products.find((p) => p.id === id);

    //check stock availability before updating state
    if (!currentItem || currentItem.qty <= 0) {
      toast.warning("Product out of stock.");
      return;
    }

    // Both state updates are now safe — stock was verified above
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p)),
    );

    //
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  // Decrease QTY when click minus button in Cart
  const decreaseQty = (id: number) => {
    const cartItem = orderItems.find((item) => item.id === id);
    console.log(
      "Decreasing quantity for item ID:",
      id,
      "Current cart item:",
      cartItem,
    );
    if (!cartItem) return; // No item found, do nothing
    if (cartItem.qty <= 1) {
      removeFromCart(id, cartItem.qty); // Remove item if qty goes to 0 or less
      return;
    }
    // restore stock on Product Card
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)),
    );
    // Update order item qty in Cart
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item,
      ),
    );
  };

  const removeFromCart = (id: number, qty: number) => {
    console.log("Removing from order item ID:", id);
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
    console.log("Updated Order Items after removal:", orderItems);

    //restore stock on Product Card when remove item from Cart
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + qty } : p)),
    );
  };
  const clearAllCartItems = () => {
    if (orderItems.length <= 0) {
      return;
    }

    if (!window.confirm("Clear all items, Are you sure?")) return;

    setProducts(
      (prev) => (
        console.log("Restoring stock for all items:", prev),
        prev.map((p) => {
          const cartItem = orderItems.find((item) => item.id === p.id);
          console.log(
            "Restoring stock for product ID:",
            p.id,
            "Cart item found:",
            cartItem,
          );
          if (cartItem) {
            return cartItem ? { ...p, qty: p.qty + cartItem.qty } : p;
          }
          return p;
        })
      ),
    );

    setOrderItems([]);
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  // const tax = subtotal * 0.1;
  const total = subtotal;

  // Handle place order logic here
  const handlePlaceOrder = () => {
    setIsOpen(false);
    setModalState("loading");

    setTimeout(() => {
      // Prepare order payload
      const payload: OrderPayload = {
        discount: 0,
        items: orderItems.map((item) => ({
          productId: item.id,
          qty: item.qty,
        })),
      };

      // hook to call create order api
      createOrderMutate(payload, {
        onSuccess: () => {
          //toast.success("Order placed successfully!");
          //clear cart and reset states after successfully
          setOrderItems([]);

          setModalState("success");
          setTimeout(() => {
            setModalState("idle"); // closes modal
          }, 2000); // ⏱ 2 seconds
        },
        onError: () => {
          setModalState("error");
        },
      });
    }, 1500);
  };

  // All Category & counter(products)
  const allcategories = [
    {
      id: undefined,
      name: "All",
    },
    ...categories,
  ];

  // Search Name in POS
  const toggleSearch = () => {
    if (searchOpen) {
      setSearchOpen(false);
      setSearchInput("");
    } else {
      setSearchOpen(true);
      setTimeout(() => inputRef.current?.focus(), 250); // wait for animation
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:h-[84vh] md:h-[80vh] grid-rows-[auto_1fr_auto] lg:grid-cols-[3fr_1fr] md:grid-cols-[2fr_1fr]  overflow-auto">
        {/* Left Sidebar */}
        {/* <div className="flex w-64 flex-col border-r">
        
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">CHANNELS</h2>
            <div className="flex items-center gap-2">
              <Search className="text-muted-foreground h-4 w-4" />
              <ChevronDown className="text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 rounded-lg bg-red-50 p-2 text-red-600">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">Office</span>
            </div>
            <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <Warehouse className="h-4 w-4" />
              <span className="text-sm">Main Warehouse</span>
            </div>
            <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <Warehouse className="h-4 w-4" />
              <span className="text-sm">Warehouse East</span>
            </div>
            <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <Warehouse className="h-4 w-4" />
              <span className="text-sm">Warehouse #12</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <Star className="h-4 w-4" />
              <span className="text-sm">Top Deals</span>
            </div>
            <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <Settings className="h-4 w-4" />
              <span className="text-sm">Setting</span>
            </div>
            <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <History className="h-4 w-4" />
              <span className="text-sm">History</span>
            </div>
            <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm">Report</span>
            </div>
          </div>
        </nav>

        <div className="border-t p-4">
          <div className="text-sm">Sales Today</div>
          <div className="text-lg font-semibold">134.55$</div>
        </div>
      </div> */}

        {/* Main Content */}
        <div className="flex flex-col overflow-auto">
          {/* Header */}
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Categories</h1>

              <div className="flex items-center gap-2">
                {/* Search Debounce */}
                <div
                  className={cn(
                    "flex items-center overflow-hidden h-9 border rounded-md transition-all duration-250",
                    searchOpen
                      ? "w-70 border-border"
                      : "w-9 border-transparent",
                  )}
                >
                  <button
                    onClick={toggleSearch}
                    className="shrink-0 w-9 h-9 flex items-center hover:bg-gray-200 justify-center"
                  >
                    <Search className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className={cn(
                      "flex-1 text-sm bg-transparent outline-none pr-2 pl-2 transition-opacity duration-200 min-w-0",
                      searchOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none",
                    )}
                  />
                  {searchInput && (
                    <button
                      onClick={() => setSearchInput("")}
                      className="shrink-0 mr-1.5 ..."
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <ChevronLeft className="text-muted-foreground h-5 w-5" />
                <ChevronRight className="text-muted-foreground h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="border-b pl-4 pt-4 pr-4">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {/* Skeleton loading. backend down  */}
              {(categoryError || isCategoryLoading) &&
                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="min-w-[80px] flex flex-col items-center rounded-lg p-2"
                  >
                    <Skeleton className="mb-2 h-12 w-12 rounded-full bg-gray-200" />
                    <Skeleton className="h-3 w-14 bg-gray-200" />
                  </div>
                ))}

              {/* or other ways */}

              {/* {categories.length === 0
                ? Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="min-w-[80px] flex flex-col items-center rounded-lg p-2"
                    >
                      <Skeleton className="mb-2 h-12 w-12 rounded-full bg-gray-200" />
                      <Skeleton className="h-3 w-14 bg-gray-200" />
                    </div>
                  ))
                : categories.map((category, index) => (
                    <div
                      key={index}
                      className="hover:bg-muted flex min-w-[80px] cursor-pointer flex-col items-center rounded-lg p-2"
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl">
                        {category.icon}
                      </div>
                      <span className="text-muted-foreground text-center text-xs">
                        {category.name}
                      </span>
                    </div>
                  ))} */}

              {/* Category secssion */}
              {allcategories.map((category, index) => (
                <div
                  key={index}
                  //className="hover:bg-muted flex max-w-auto cursor-pointer bg-amber-300 flex-row items-center rounded-lg p-2"
                  className={cn(
                    "flex cursor-pointer flex-row items-center gap-0 p-2 rounded-lg border transition-all duration-150  h-[40px]",
                    selectedCategory === category.id
                      ? "border-blue-300 bg-blue-50 shadow-sm"
                      : "border-border bg-background hover:bg-muted",
                  )}
                  //onClick={() => setSelectedCategory(category.id)}
                  onClick={() =>
                    setSelectedCategory(
                      category.id === undefined ? undefined : category.id,
                    )
                  }
                >
                  {/* <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl">
                    {category.icon}
                  </div> */}

                  <span className="w-max text-muted-foreground text-black text-center text-sm px-1">
                    {category.name}
                  </span>
                  <div
                    className={cn(
                      " px-2",
                      selectedCategory === category.id
                        ? "border-blue-300"
                        : "border-border",
                    )}
                  >
                    <span
                      className={cn(
                        "text-[10px] font-semibold rounded px-1.5 py-0.5",
                        selectedCategory === category.id
                          ? "bg-blue-100 text-blue-700"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      0
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Render */}
          <div className="flex-1 overflow-auto overflow-y-auto py-6 pr-4 pl-2">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {(productError || isProductLoading) &&
                Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="animate-pulse rounded-lg border p-2">
                    <div className="h-32 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                  </div>
                ))}
              {displayProducts.map((item: IProduct) => (
                <Card
                  key={item.id}
                  //className="cursor-pointer transition-shadow hover:shadow-lg p-0"
                  // className={`p-0 transition-shadow ${
                  //   isBackendDown
                  //     ? "opacity-40 pointer-events-none cursor-not-allowed"
                  //     : "cursor-pointer hover:shadow-lg"
                  // }`}
                  className="p-0 transition-shadow cursor-pointer"
                  onClick={() => addToCart(item)}
                >
                  <CardContent className="p-0 h-[40vh] sm:h-[40vh] xl:h-[34vh]">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg h-[60%] w-full">
                      <img
                        src={
                          item.productImages?.[0]?.imageURL ??
                          "../assets/box.png"
                        }
                        alt={item.name}
                        className="h-full w-full object-contain object-center transition-transform"
                      />
                    </div>
                    <div className="p-4 h-[40%]">
                      <h3 className="mb-1 md:text-[16px] font-semibold truncate">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground mb-2 text-sm ">
                        {item.category?.name}
                      </p>
                      <div className="flex justify-between flex-wrap items-center gap-0.5">
                        <p className="text-lg md:text-[18px] font-bold text-blue-600">
                          {/* ${item.price.toFixed(2)} */}${item.price}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.qty === 0
                            ? "Out of Stock"
                            : `In Stock: ${item.qty}`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Order Summary lg:grid-cols-[1fr_300px] md:flex lg:flex */}
        <div className="flex flex-col border-l overflow-auto h-90 md:h-auto md:w-90 xl:w-100 2xl:w-full relative">
          <div className="border-b p-4.5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Cart Items</h2>
              <div className="flex items-center gap-2">
                <Trash2
                  onClick={clearAllCartItems}
                  className={`text-muted-foreground h-4 w-4 text-red-600 cursor-pointer 
                  `}
                />
              </div>
            </div>
          </div>

          <ScrollArea className="overflow-y-auto h-[50vh] 2xl:h-screen">
            <div className="space-y-4 p-4">
              {productError || !orderItems || orderItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[30vh] text-center text-gray-400">
                  <ShoppingCart className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-lg font-semibold">Cart is empty</p>
                  <p className="text-sm">Start adding items to your cart</p>
                </div>
              ) : (
                orderItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex items-center gap-1 "
                  >
                    <div className="bg-white flex h-18 w-20 items-center justify-center rounded-sm">
                      {/* <span className="text-lg">{index + 1}</span> */}
                      <div className="">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-contain object-center rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-[1fr_auto] grid-rows-2 gap-x-2 w-full place-content-between">
                      {/* Row 1 - LEFT */}
                      <div>
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-muted-foreground text-xs">
                          {item.category ?? ""}
                        </p>
                      </div>

                      {/* Row 1 - RIGHT (Trash) */}
                      <div className="justify-self-end">
                        <Trash2
                          onClick={() => removeFromCart(item.id, item.qty)}
                          className="h-4 w-4 text-red-600 cursor-pointer"
                        />
                      </div>

                      {/* Row 2 - LEFT (Qty) */}
                      <div className="flex items-end gap-3 py-1 ">
                        <button
                          className={`p-[4px] rounded bg-gray-100 hover:bg-gray-300 `}
                          onClick={() => decreaseQty(item.id)}
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span>{item.qty}</span>

                        <button
                          //className="p-[4px] rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                          className={`p-[4px] rounded transition-colors
                            ${
                              getAvailableStock(item.id) <= 0
                                ? "bg-gray-400 cursor-not-allowed opacity-50"
                                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                            }`}
                          onClick={() => increaseQty(item.id)}
                          disabled={getAvailableStock(item.id) <= 0}
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      {/* Row 2 - RIGHT (Price) */}
                      <div className="justify-end items-end self-end text-right py-1 font-semibold bg-amber-200">
                        <span className="font-semibold">
                          {/* ${item.price * item.qty} */}
                          <span>${(item.price * item.qty).toFixed(2)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <div className="sticky bottom-0 border-t p-4 rounded-2xl shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
            <div className="mb-4 space-y-2">
              {/* Sub Total */}
              <div className="flex justify-between text-sm">
                <span>Sub-Total</span>
                <span>{subtotal.toFixed(2)}$</span>
              </div>
              {/* Tax */}
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>0$</span>
                {/* <span>{tax.toFixed(2)}$</span> */}
              </div>
              {/* Discount */}
              <div className="flex justify-between text-sm">
                <span>Discount</span>
                {/* <span>{tax.toFixed(2)}$</span> */}
                <span>0$</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{total.toFixed(2)}$</span>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="flex h-auto flex-col items-center bg-transparent p-2"
              >
                <div className=" flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                  <span className="font-semibold text-green-600">$</span>
                </div>
                <span className="text-xs">Cash</span>
              </Button>
              <Button
                variant="outline"
                className="flex h-auto flex-col items-center bg-transparent p-2"
              >
                <div className=" flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-xs">Debit</span>
              </Button>
              <Button
                variant="outline"
                className="flex h-auto flex-col items-center bg-transparent p-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                  <QrCode className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-xs">Scan</span>
              </Button>
            </div>

            <Button
              onClick={() => setIsOpen(true)}
              className={`w-full bg-blue-600 py-3 text-white hover:bg-blue-700`}
            >
              Checkout ${total.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>

      {/*  Checkout Dialog */}
      <CheckoutDialog
        open={isOpen}
        setOpen={() => setIsOpen(false)}
        isCancel={false}
        width="40%"
        title="Order summary"
      >
        <div className="space-y-2">
          {orderItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-2 "
            >
              <div className="bg-white flex h-18 w-24 items-center justify-center rounded-sm">
                {/* <span className="text-lg">{index + 1}</span> */}
                <div className="">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-contain object-center rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 grid-rows-1 w-full place-content-between">
                {/* Row 1 - LEFT */}
                <div className="flex flex-col ">
                  <h4 className="text-[16px] font-medium">{item.name}</h4>
                  <p className="text-muted-foreground text-xs">
                    {item.category ?? ""}
                  </p>
                  {/* Row 2 - LEFT (Qty) */}
                  <div className="flex flex-wrap items-end gap-1 ">
                    <span className="text-gray-500 text-[12px]">
                      {item.qty} X
                    </span>
                    <span className="text-[12px] font-bold pt-0.5 text-blue-600">
                      ${item.price}
                    </span>
                  </div>
                </div>
                {/* Row 2 - RIGHT (Price) */}
                <div className="h-full flex justify-end items-cente text-right py-1 font-semibold ">
                  <span className="font-semibold">
                    {/* ${item.price * item.qty} */}
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-2">
          <p className="text-xl">Total: $ {total.toFixed(2)}</p>
        </div>

        <Button
          onClick={handlePlaceOrder}
          type="button"
          disabled={isPending}
          className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
        >
          {isPending ? <Spinner className="text-white" /> : ""}
          {isPending ? "Placing Order..." : "Place Order"}
        </Button>
      </CheckoutDialog>

      {/* Loading, Success, Error modal */}
      {modalState !== "idle" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-md shadow-xl p-8 w-[320px] text-center transition-all duration-300 scale-100">
            {modalState === "loading" && (
              <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-lg font-medium text-gray-700">
                  Processing your order...
                </p>
              </div>
            )}

            {modalState === "success" && (
              <div className="flex flex-col items-center gap-4">
                <Button
                  variant="ghost"
                  className="fixed right-1 top-1 px-0.5 py-0.5 text-red-600"
                >
                  <CircleX />
                </Button>
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  Order Create Successfully
                </p>
              </div>
            )}

            {modalState === "error" && (
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={() => setModalState("idle")}
                  variant="ghost"
                  className="fixed right-1 top-1 px-0.5 py-0.5 text-red-600"
                >
                  <CircleX />
                </Button>
                <p className="text-red-500 font-medium">Something went wrong</p>

                <button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

//  <div className="relative h-screen">
//     {/* Parent Grid for Desktop */}
//     <div className="hidden lg:grid h-screen grid-cols-[3fr_1fr] gap-4 overflow-auto">
//       {/* Main Content */}
//       <div className="flex flex-col overflow-auto">
//         {/* Header */}
//         <div className="border-b p-4 flex items-center justify-between">
//           <h1 className="text-xl font-semibold">Categories</h1>
//           <div className="flex items-center gap-2">
//             <ChevronLeft className="text-muted-foreground h-5 w-5" />
//             <ChevronRight className="text-muted-foreground h-5 w-5" />
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="border-b p-4">
//           <div className="flex gap-4 overflow-x-auto">
//             {categories.map((category, index) => (
//               <div
//                 key={index}
//                 className="hover:bg-muted flex min-w-[80px] cursor-pointer flex-col items-center rounded-lg p-2"
//                 onClick={() => setSelectedCategory(category.name)}
//               >
//                 <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl">
//                   {category.icon}
//                 </div>
//                 <span className="text-muted-foreground text-center text-xs">
//                   {category.name}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Menu Items */}
//         <div className="flex-1 overflow-auto py-6 pr-4 pl-2">
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
//             {menuItems.map((item) => (
//               <Card
//                 key={item.id}
//                 className="cursor-pointer transition-shadow hover:shadow-lg p-0"
//                 onClick={() => addToOrder(item)}
//               >
//                 <CardContent className="p-0">
//                   <div className="relative aspect-video overflow-hidden rounded-t-lg">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="h-full w-full object-contain object-center transition-transform hover:scale-105"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h3 className="mb-1 font-semibold">{item.name}</h3>
//                     <p className="text-muted-foreground mb-2 text-sm">
//                       {item.category}
//                     </p>
//                     <p className="text-lg font-bold text-blue-600">
//                       ${item.price.toFixed(2)}
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Sidebar Desktop */}
//       <div className="flex flex-col border-l overflow-auto">
//         <div className="border-b p-4.5 flex items-center justify-between">
//           <h2 className="font-semibold">
//             Draft #{draftNumber.toString().padStart(3, "0")}
//           </h2>
//           <div className="flex items-center gap-2">
//             <Plus className="text-muted-foreground h-4 w-4" />
//             <Trash2 className="text-muted-foreground h-4 w-4" />
//           </div>
//         </div>

//         <ScrollArea className="flex-1 overflow-y-auto">
//           <div className="space-y-3 p-4">
//             {orderItems.map((item, index) => (
//               <div key={`${item.id}-${index}`} className="flex items-center gap-3">
//                 <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-lg">
//                   <span className="text-lg">{index + 1}</span>
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="text-sm font-medium">{item.name}</h4>
//                   <p className="text-muted-foreground text-xs">
//                     {item.description || "Lorem ipsum dolor sit"}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold">${item.price.toFixed(2)}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ScrollArea>

//         <div className="sticky bottom-0 border-t p-4 rounded-2xl shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
//           <div className="mb-4 space-y-2">
//             <div className="flex justify-between text-sm">
//               <span>Sub-Total</span>
//               <span>{subtotal.toFixed(2)}$</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span>Tax</span>
//               <span>{tax.toFixed(2)}$</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span>Discount</span>
//               <span>0$</span>
//             </div>
//             <Separator />
//             <div className="flex justify-between font-semibold">
//               <span>Total</span>
//               <span>{total.toFixed(2)}$</span>
//             </div>
//           </div>

//           <div className="mb-4 grid grid-cols-3 gap-2">
//             <Button variant="outline" className="flex flex-col items-center p-2">
//               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
//                 <span className="font-semibold text-green-600">$</span>
//               </div>
//               <span className="text-xs">Cash</span>
//             </Button>
//             <Button variant="outline" className="flex flex-col items-center p-2">
//               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
//                 <CreditCard className="h-4 w-4 text-blue-600" />
//               </div>
//               <span className="text-xs">Debit</span>
//             </Button>
//             <Button variant="outline" className="flex flex-col items-center p-2">
//               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
//                 <QrCode className="h-4 w-4 text-purple-600" />
//               </div>
//               <span className="text-xs">Scan</span>
//             </Button>
//           </div>

//           <Button className="w-full bg-blue-600 py-3 text-white hover:bg-blue-700">
//             Checkout ${total.toFixed(2)}
//           </Button>
//         </div>
//       </div>
//     </div>

//     {/* Mobile / Tablet Floating Cart Button */}
//     <button
//       className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg lg:hidden"
//       onClick={() => setSidebarOpen(true)}
//     >
//       🛒 {orderItems.length}
//     </button>

//     {/* Slide-in Sidebar Drawer for Mobile/Tablet */}
//     <div
//       className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform lg:hidden
//         ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
//     >
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/40"
//         onClick={() => setSidebarOpen(false)}
//       />
//       <div className="relative flex flex-col h-full">
//         {/* Sidebar content same as desktop */}
//         <div className="border-b p-4.5 flex items-center justify-between">
//           <h2 className="font-semibold">
//             Draft #{draftNumber.toString().padStart(3, "0")}
//           </h2>
//           <div className="flex items-center gap-2">
//             <Plus className="text-muted-foreground h-4 w-4" />
//             <Trash2 className="text-muted-foreground h-4 w-4" />
//           </div>
//         </div>
//         <ScrollArea className="flex-1 overflow-y-auto">
//           <div className="space-y-3 p-4">
//             {orderItems.map((item, index) => (
//               <div key={`${item.id}-${index}`} className="flex items-center gap-3">
//                 <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-lg">
//                   <span className="text-lg">{index + 1}</span>
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="text-sm font-medium">{item.name}</h4>
//                   <p className="text-muted-foreground text-xs">
//                     {item.description || "Lorem ipsum dolor sit"}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold">${item.price.toFixed(2)}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//         <div className="sticky bottom-0 border-t p-4 rounded-2xl shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
//           <div className="mb-4 space-y-2">
//             <div className="flex justify-between text-sm">
//               <span>Sub-Total</span>
//               <span>{subtotal.toFixed(2)}$</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span>Tax</span>
//               <span>{tax.toFixed(2)}$</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span>Discount</span>
//               <span>0$</span>
//             </div>
//             <Separator />
//             <div className="flex justify-between font-semibold">
//               <span>Total</span>
//               <span>{total.toFixed(2)}$</span>
//             </div>
//           </div>
//           <Button className="w-full bg-blue-600 py-3 text-white hover:bg-blue-700">
//             Checkout ${total.toFixed(2)}
//           </Button>
//         </div>
//       </div>
//     </div>
//   </div>
