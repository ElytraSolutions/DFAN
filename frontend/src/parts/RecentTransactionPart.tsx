export const RecentTranstractionsPart = ({ inf }) => {
    return (
        <div className="p-2 bg-slate-800 text-white flex flex-row grow justify-between items-center ">
            <div className="flex flex-col gap-1">
                <div className="text-green-400">01e4dsa</div>
                <div>{inf.name}</div>
            </div>
            <div>2021-09-01</div>
            <button className="p-1 text-white bg-green-400 rounded-md">
                $43.95
            </button>
        </div>
    );
};
