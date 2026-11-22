import StatCard from "./stat-card";

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          href={stat.href}
          description={stat.description}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
