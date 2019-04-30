module.exports = today => {
  if (today[0] >= "19" && today[0] <= "23" && today[1] == "04") {
    return {
      dates: [
        {
          name: "Easter",
          check: true
        }
      ]
    };
  } else if (today[0] >= "01" && today[0] <= "31" && today[1] == "12") {
    return {
      dates: [
        {
          name: "Christmas",
          check: true
        }
      ]
    };
  } else if (today[0] >= "01" && today[0] <= "31" && today[1] == "10") {
    return {
      dates: [
        {
          name: "Halloween",
          check: true
        }
      ]
    };
  }
};
