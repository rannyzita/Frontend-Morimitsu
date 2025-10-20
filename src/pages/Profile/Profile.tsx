import { type FC } from "react";
import { Box } from "@mui/material";
import { PageLayout } from "../../components/layout/BigCardGray";

export const Profile: FC = () => {
    return (
        <Box component='div' className='flex flex-col items-center justify-center h-full p-4'>
            <PageLayout>
                <div className='flex flex-col gap-6 mt-14 items-center'>
                    Profile Page Content
                </div>
            </PageLayout>
        </Box>
    )
}