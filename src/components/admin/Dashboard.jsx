import AppInfoBox from "../AppInfoBox";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-3 gap-5 my-5">
            <AppInfoBox title='Total Uploads' subTitle='100' />
            <AppInfoBox title='Total Reviews' subTitle='1,500' />
            <AppInfoBox title='Total Users' subTitle='200' />
        </div>
    );
};