import { RecentTranstractionsPart as Part } from '~/parts/RecentTransactionPart';

const RecentTranstractions = () => {
    const data = [
        { name: 'ram' },
        { name: 'shyam' },
        { name: 'hari' },
        { name: 'gita' },
        { name: 'sita' },
        { name: 'hari' },
        { name: 'gita' },
        { name: 'sita' },
    ];
    return (
        <div className="bg-slate-500 flex flex-col gap-1 overflow-y-scroll">
            <div className="bg-slate-800 text-white p-2">
                <h1>Recent Transactions</h1>
            </div>
            {data.map((details) => (
                <Part inf={details} />
            ))}
        </div>
    );
};

export default RecentTranstractions;
