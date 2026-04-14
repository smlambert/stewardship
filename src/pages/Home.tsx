import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Users, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card, CardBody } from '@/components/common/Card';
import { useStore } from '@/store/useStore';

const Home: React.FC = () => {
  const { sites, volunteers, assignments } = useStore();
  
  const stats = {
    sites: Object.keys(sites).length,
    volunteers: Object.keys(volunteers).length,
    upcomingAssignments: Object.values(assignments).filter(
      a => a.status === 'scheduled' && new Date(a.date) >= new Date()
    ).length,
    totalHours: Object.values(volunteers).reduce((sum, v) => sum + v.totalHours, 0),
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Planting trees with a visionary plan
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              We engage the local community to plant trees, link ecosystems, and steward resilient urban forests through private and public landowner collaboration.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/login">
                <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white border-0">
                  Get Involved
                </Button>
              </Link>
              <Link to="/sites">
                <Button size="lg" variant="outline" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-500">
                  Explore Sites
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardBody>
              <TreePine className="w-12 h-12 mx-auto mb-4 text-primary-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.sites}</div>
              <div className="text-gray-600">Active Sites</div>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody>
              <Users className="w-12 h-12 mx-auto mb-4 text-secondary-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.volunteers}</div>
              <div className="text-gray-600">Volunteers</div>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody>
              <Calendar className="w-12 h-12 mx-auto mb-4 text-accent-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.upcomingAssignments}</div>
              <div className="text-gray-600">Upcoming Events</div>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody>
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.totalHours.toLocaleString()}</div>
              <div className="text-gray-600">Hours Contributed</div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-primary-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg mb-4 leading-relaxed">
                Based in Ottawa, Ontario, Forêt Capitale Forest is a registered charity with a mission to mitigate the effects of climate change by facilitating the planting of forests and raising awareness of the importance of trees and biodiversity.
              </p>
              <p className="text-lg leading-relaxed">
                We engage the local community to plant trees, link ecosystems, and steward resilient urban forests through private and public landowner collaboration.
              </p>
            </div>
            <div className="flex justify-center">
              <svg width="300" height="300" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="140" r="50" fill="currentColor" opacity="0.2"/>
                <path d="M60 180 L60 100 M60 100 Q60 70 80 60 M60 100 Q60 70 40 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <path d="M100 180 L100 90 M100 90 Q100 60 120 50 M100 90 Q100 60 80 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <path d="M140 180 L140 100 M140 100 Q140 70 160 60 M140 100 Q140 70 120 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="80" cy="58" r="6" fill="currentColor"/>
                <circle cx="40" cy="58" r="6" fill="currentColor"/>
                <circle cx="120" cy="48" r="6" fill="currentColor"/>
                <circle cx="80" cy="48" r="6" fill="currentColor"/>
                <circle cx="160" cy="58" r="6" fill="currentColor"/>
                <circle cx="120" cy="58" r="6" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How to Get Involved
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community and start making a difference in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-primary-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p className="text-gray-600">
              Create your volunteer profile and tell us about your skills and availability
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-secondary-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Join a Planting</h3>
            <p className="text-gray-600">
              Browse available sites and sign up for tree planting activities that match your schedule
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Make an Impact</h3>
            <p className="text-gray-600">
              Participate in activities, log your hours, and help build resilient urban forests
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join our community of volunteers and help us mitigate climate change through urban forestry
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white border-0">
              Become a Volunteer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

// Made with Bob
