const handleHistory = (itemId) => {
    setLoading(true);
    setHistoryId(itemId);
    setTimeout(() => {
        setLoading(false);
        navigate("/projects");
    }, 1000);
};