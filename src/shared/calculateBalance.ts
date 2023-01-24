export default (assetCode: string, balance: number, blocked: number) => {
    const total = isNaN(balance - blocked) ? 0 : balance - blocked
    if (assetCode === 'USD' || assetCode === 'USDC') {
        return total.toFixed(2)
    }

    return total.toFixed(8)
}