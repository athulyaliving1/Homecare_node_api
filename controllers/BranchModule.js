const branchlocation = (req, res) => {
    const { branch_city_id } = req.query;
  
    const query = `SELECT DISTINCT id,branch_name FROM master_branches WHERE branch_city_id=${branch_city_id}`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching location:", err);
        res.status(500).send("An error occurred");
      } else {
        res.json(results);
        // console.log(results);
      }
    });
  };
  module.exports = {
    branchlocation
  };