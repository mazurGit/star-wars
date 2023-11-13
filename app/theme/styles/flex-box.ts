const FLEX_BOX_STYLES = {
  fx1: {
    flex: 1,
  },
  fxGrow1: {
    flexGrow: 1,
  },
  fdRow: {
    flexDirection: "row",
  },
  fdCol: {
    flexDirection: "column",
  },
  algCenter: {
    alignItems: "center",
  },
  algStart: {
    alignItems: "flex-start",
  },
  algEnd: {
    alignItems: "flex-end",
  },
  algSelfStart: {
    alignSelf: "flex-start",
  },
  algSelfBaseline: {
    alignSelf: "baseline",
  },
  algSelfCenter: {
    alignSelf: "center",
  },
  algSelfEnd: {
    alignSelf: "flex-end",
  },
  algSelfStretch: {
    alignSelf: "stretch",
  },
  jcCenter: {
    justifyContent: "center",
  },
  jcStart: {
    justifyContent: "flex-start",
  },
  jcEnd: {
    justifyContent: "flex-end",
  },
  jcSpaceBtw: {
    justifyContent: "space-between",
  },
  jcXYCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  txAlgCenter: {
    textAlign: "center",
  },
  txAlgLeft: {
    textAlign: "left",
  },
  txAlgRight: {
    textAlign: "right",
  },
  txAlgVerticalAuto: {
    textAlignVertical: "auto",
  },
  txAlgVerticalBottom: {
    textAlignVertical: "bottom",
  },
  txAlgVerticalCenter: {
    textAlignVertical: "center",
  },
  txAlgVerticalTop: {
    textAlignVertical: "top",
  },
  overflowHidden: {
    overflow: "hidden",
  },
} as const;

export { FLEX_BOX_STYLES };
