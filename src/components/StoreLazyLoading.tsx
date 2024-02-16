import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const StoreLazyLoading = () => {
  return (
    <Card className=" z-[-99] mb-9 shadow-md dark:bg-slate-900 sm:mx-3">
      <Skeleton className="h-[21.5rem]">
        <div className="flex h-[200px] w-full items-center justify-center rounded-t-sm bg-gray-300 dark:bg-slate-600">
          <svg
            className=" size-10 text-gray-200 dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <CardContent>
          <div className=" mt-6 h-4 w-full rounded-full  bg-gray-300 dark:bg-slate-600" />
        </CardContent>
        <CardFooter>
          <div className="h-10 w-full rounded-md bg-gray-300 dark:bg-slate-600" />
        </CardFooter>
      </Skeleton>
    </Card>
  );
};
