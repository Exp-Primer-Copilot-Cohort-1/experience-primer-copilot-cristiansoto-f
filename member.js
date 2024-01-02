function skillsMember() {
    var name = "Sia";
    var age = 20;
    var skills = ["Javascript", "HTML", "CSS"];
    var address = "Bogor";
    var is_married = false;
    var list_school = [
        {
            name: "SMAN 1 Bogor",
            year_in: 2015,
            year_out: 2018,
            major: "IPA"
        },
        {
            name: "SMPN 1 Bogor",
            year_in: 2012,
            year_out: 2015,
            major: null
        },
        {
            name: "SDN 1 Bogor",
            year_in: 2006,
            year_out: 2012,
            major: null
        }
    ];
    var interest_in_coding = true;

    var json = {
        name,
        age,
        skills,
        address,
        is_married,
        list_school,
        interest_in_coding
    };
    return JSON.stringify(json);
}