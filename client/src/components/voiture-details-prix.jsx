
const VoitureDetailsPrix = ({data}) => {
    return (
        <div className="p-10 rounded-xl border shadow-md">
            <h2></h2>
            <h2 className="font-blod text-4xk">{data?.tarif[0].tarifLocation}</h2>
        </div>
    );
}

export default VoitureDetailsPrix;
