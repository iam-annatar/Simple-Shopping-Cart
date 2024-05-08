import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import LoadingImage from "../../../../public/icons/loadingImage.svg?react";

export const StoreLazyLoading = () => {
  return (
    <Card className=" z-[-99] mb-9 shadow-md dark:bg-slate-900 sm:mx-3">
      <Skeleton className="h-[21.5rem]">
        <div className="flex h-[200px] w-full items-center justify-center rounded-t-sm bg-gray-300 dark:bg-slate-600">
          <LoadingImage />
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
