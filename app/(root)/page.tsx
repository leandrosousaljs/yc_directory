import StartupCard from '@/components/StartupCard'
import SearchForm from '../../components/SearchForm';

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 123,
      author: { _id: 1, name: 'Luke Smith' },
      _id: 1,
      description: 'This is a sample description',
      image:
        'https://cdn1.epicgames.com/offer/428115def4ca4deea9d69c99c5a5a99e/EN_Bungie_D2_S27_OfferLandscape_S1_2560x1440_2560x1440-0aa20ea10d57acb82c0fee4699a447cc',
      category: 'Games',
      title: 'Destiny 2',
    },
  ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className='text-30-semibold'>{query ? `Search Results for "${query}"` : 'All Startups'}</p>

        <ul className='mt-7 card_grid'>
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className='no-results'>No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
