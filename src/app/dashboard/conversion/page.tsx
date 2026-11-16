"use client";

import { useMemo, useState } from "react";
import { PaymentMethodsRing } from "@/components/charts/PaymentMethodsRing";
import { VisitsPaymentsChart } from "@/components/charts/VisitsPaymentsChart";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Funnel } from "@/components/ui/Funnel";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Tabs } from "@/components/ui/Tabs";
import {
  PERIOD_OPTIONS,
  mockConversionByPeriod,
  type PeriodKey,
} from "@/mock-data";

export default function ConversionPage() {
  const [period, setPeriod] = useState<PeriodKey>("30d");
  const data = mockConversionByPeriod[period];

  const funnelSteps = useMemo(() => {
    const { visitors, startedPayment, paid } = data.funnel;
    return [
      { title: "Visiteurs de la page de don", count: visitors },
      {
        title: "Ont commencé un paiement",
        count: startedPayment,
        percentFromPrevious: (startedPayment / visitors) * 100,
      },
      {
        title: "Ont payé",
        count: paid,
        percentFromPrevious: (paid / startedPayment) * 100,
      },
    ];
  }, [data.funnel]);

  return (
    <div className="space-y-8">
      <PageHeader
        label="Acquisition"
        title="Conversion"
        description="Les visites sont comptées sans cookie ni donnée personnelle."
        action={
          <Tabs
            options={PERIOD_OPTIONS}
            value={period}
            onChange={setPeriod}
          />
        }
      />

      <div className="dashboard-stagger space-y-8">
        <Card title="Entonnoir">
          <Funnel steps={funnelSteps} />
        </Card>

        <StatTile
          label="Taux de conversion"
          accent
          valueNumber={data.conversionRate}
          formatAsMoney={false}
          suffix="%"
        />

        <Card title="Visites et paiements dans le temps">
          <VisitsPaymentsChart data={data.timeSeries} />
        </Card>

        <Card title="Sources de trafic">
          <DataTable
            columns={[
              {
                key: "source",
                header: "Source",
                render: (row) => row.source,
              },
              {
                key: "visits",
                header: "Visites",
                className: "font-mono tabular-nums",
                render: (row) => row.visits.toLocaleString("fr-FR"),
              },
              {
                key: "payments",
                header: "Paiements",
                className: "font-mono tabular-nums",
                render: (row) => row.payments.toLocaleString("fr-FR"),
              },
              {
                key: "rate",
                header: "Taux",
                className: "font-mono tabular-nums",
                render: (row) => `${row.rate.toFixed(1)}%`,
              },
            ]}
            rows={data.trafficSources}
            rowKey={(row) => row.source}
          />
        </Card>

        <Card title="Moyens de paiement">
          <PaymentMethodsRing data={data.paymentMethods} />
        </Card>
      </div>
    </div>
  );
}