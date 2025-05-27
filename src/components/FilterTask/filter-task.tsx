import type { TaskFilter as FilterType } from '../../validation/task';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import styles from './filter-task.module.css';

interface TaskFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export default function TaskFilter({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
}: TaskFilterProps) {
  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchIcon}>
          <MagnifyingGlassIcon />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className={styles.searchInput}
        />
      </div>

      <div className={styles.tabs}>
        {(['all', 'active', 'completed'] as const).map((value) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`${styles.tabButton} ${filter === value ? styles.tabButtonActive : ''}`}
            type="button"
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
            <span className={styles.tabCount}>{counts[value]}</span>
            {filter === value && <div className={styles.tabUnderline} />}
          </button>
        ))}
      </div>
    </div>
  );
}
