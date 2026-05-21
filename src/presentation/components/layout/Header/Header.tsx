import Link from 'next/link';
import { Container } from '../Container/Container';
import { SearchBar } from '../../search/SearchBar/SearchBar';
import { CartIcon } from '../../ui/CartIcon/CartIcon';

export interface HeaderProps {
  initialSearchValue?: string;
}

function Header({ initialSearchValue = '' }: HeaderProps) {
  return (
    <header className="bg-[var(--color-primary)] text-white shadow-md">
      <Container>
        <div className="flex items-center h-14 sm:h-16 gap-3">
          <Link
            href="/"
            className="flex-shrink-0 text-xl font-bold tracking-tight hover:opacity-90 transition-opacity"
            aria-label="Bidcom home"
          >
            <span className="text-white">bid</span>
            <span className="text-[var(--color-secondary)]">com</span>
          </Link>

          <div className="flex-1 min-w-0">
            <SearchBar initialValue={initialSearchValue} />
          </div>

          <CartIcon />
        </div>
      </Container>
    </header>
  );
}

export { Header };
export default Header;
