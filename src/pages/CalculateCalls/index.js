import React, { useEffect, useState } from "react";
import { MdInfo } from "react-icons/md";
import phoneGirl from "../../assets/animations/phoneGirl.json";
import AnimationLottie from "../../components/AnimationLottie";
import HeaderStyled from "../../components/Header";
import Input from "../../components/Input";
import InputSelect from "../../components/InputSelect";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import RowResult from "../../components/RowResult";
import calculateController from "../../controllers/calculate";
import codes from "../../utils/codes.json";
import data from "../../utils/data.json";
import plans from "../../utils/plans.json";
import {
  AnimationBoxStyled,
  CalculateStyled,
  ContainerStyled,
  GroupInputStyled,
  GroupResultStyled,
  InfoStyled,
  MainStyled,
} from "./styles";

function CalculateCalls() {
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState(codes[0].label);
  const [destination, setDestination] = useState(codes[1].label);
  const [plan, setPlan] = useState(plans[0].label);
  const [callTime, setCallTime] = useState("");
  const [withPlan, setWithPlan] = useState(0);
  const [withoutPlan, setWithoutPlan] = useState(0);
  const [profit, setProfit] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const calculator = new calculateController();

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  const calculateCallsPerMinute = () => {
    let { minute } = calculator.getValuePerMinute(origin, destination);
    let minuteRate = calculator.calculateRate(minute);
    let valueCallTime = calculator.getLimitPlan(plan);

    setWithPlan(() =>
      calculator.calculateWithPlan(callTime, valueCallTime, minuteRate)
    );
    setWithoutPlan(() => calculator.calculateWithoutPlan(callTime, minute));
  };

  useEffect(() => {
    if (origin && destination && plan && callTime) {
      calculateCallsPerMinute();
    } else {
      setWithPlan(0);
      setWithoutPlan(0);
    }
  }, [origin, destination, plan, callTime]);

  useEffect(() => {
    setProfit(() => calculator.calculateProfit(withoutPlan, withPlan));
  }, [withPlan, withoutPlan]);

  return (
    <>
      <Loading show={loading} />
      <Modal
        visibility={openModal}
        modalHandler={setOpenModal}
        data={data}
        labelHeader={[
          "ddd (origem)",
          "ddd (destino)",
          "$/min",
          "$/min excedente ***",
        ]}
      />
      <HeaderStyled backPage />
      <ContainerStyled>
        <AnimationBoxStyled>
          <AnimationLottie animationData={phoneGirl} height="75%" width="75%" />
        </AnimationBoxStyled>
        <MainStyled>
          <CalculateStyled>
            <GroupInputStyled>
              <InputSelect
                width={45}
                label="ddd (origem)"
                name="origin"
                values={codes}
                valueChange={(value) => {
                  value.origin !== "011"
                    ? setDestination("011")
                    : setDestination("016");
                  setOrigin(value.origin);
                }}
                changeValue={origin}
                testid="origin"
              />
              <InputSelect
                width={45}
                label="ddd (destino)"
                name="destination"
                values={codes}
                valueChange={(value) => {
                  value.destination !== "011"
                    ? setOrigin("011")
                    : setOrigin("016");
                  setDestination(value.destination);
                }}
                changeValue={destination}
                testid="destination"
              />
            </GroupInputStyled>
            <GroupInputStyled>
              <InputSelect
                width={45}
                label="plano faleMais"
                name="plan"
                values={plans}
                valueChange={(value) => {
                  setPlan(value.plan);
                }}
                testid="plan"
              />
              <Input
                width={45}
                label="tempo da ligação (min.)"
                name="callTime"
                onChange={(value) => {
                  setCallTime(value.callTime);
                }}
                value={callTime}
                maxLength={9}
                testid="callTime"
              />
            </GroupInputStyled>
          </CalculateStyled>
          <GroupResultStyled>
            <RowResult
              label="com plano"
              value={withPlan === 0 ? "gratuito" : withPlan}
              number={withPlan === 0 ? false : true}
            />
            <RowResult label="sem plano" value={withoutPlan} />
            <RowResult
              label="custo-benefício"
              value={profit}
              color={
                profit === 0 ? "#FFFFFF" : profit < 0 ? "#FF0000" : "#00FF00"
              }
              bold
            />
          </GroupResultStyled>
          <InfoStyled>
            <label data-testid="info-label">
              consulte as tarifas fixas por minuto clicando no ícone
            </label>
            <MdInfo
              onClick={() => setOpenModal(true)}
              style={{ fontSize: 25, cursor: "pointer" }}
              data-testid="open-modal"
            />
          </InfoStyled>
        </MainStyled>
      </ContainerStyled>
    </>
  );
}

export default CalculateCalls;
