import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export type Customer = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  createdAt: string;
  email: string;
};

interface Props {
  customer: Customer;
}
export const CustomerAvatar = ({ customer }: Props) => {
  //Generate initials from firstName and lastName fields
  const firstName = customer.firstname ?? "";
  const lastName = customer.lastname ?? "";

  const fullName = `${firstName} ${lastName}`.trim();

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  // Generate initials from username field
  // const initials =
  //   customer.username
  //     ?.split(" ")
  //     ?.map((name) => name[0])
  //     ?.join("")
  //     ?.toUpperCase() || "U";
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        {/* <AvatarImage
          src={customer.image ?? undefined} // ✅ dynamic
          alt={customer.username}
          className="grayscale"
        /> */}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="font-medium">{fullName || "Unknown"}</span>
        <span className="text-sm text-muted-foreground">{customer.email}</span>
      </div>
    </div>
  );
};
