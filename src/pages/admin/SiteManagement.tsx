import React from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useStore } from '@/store/useStore';
import { Site, SiteType, SiteStatus } from '@/types/site';
import { SITE_TYPES, SITE_STATUS, PROVINCES } from '@/utils/constants';

const SiteManagement: React.FC = () => {
  const { sites, volunteers, addSite, updateSite, deleteSite } = useStore();
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingSite, setEditingSite] = React.useState<Site | null>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    address: '',
    city: '',
    province: 'Ontario',
    postalCode: '',
    siteType: 'park' as SiteType,
    size: 0,
    treeCount: 0,
    coordinatorId: '',
    status: 'active' as SiteStatus,
    notes: '',
    wheelchairAccessible: false,
    parkingAvailable: false,
    publicTransitNearby: false,
    restrooms: false,
  });

  const coordinators = Object.values(volunteers).filter(
    v => v.role === 'coordinator' || v.role === 'admin'
  );

  const handleOpenForm = (site?: Site) => {
    if (site) {
      setEditingSite(site);
      setFormData({
        name: site.name,
        description: site.description,
        address: site.address,
        city: site.city,
        province: site.province,
        postalCode: site.postalCode,
        siteType: site.siteType,
        size: site.size,
        treeCount: site.treeCount,
        coordinatorId: site.coordinatorId || '',
        status: site.status,
        notes: site.notes,
        wheelchairAccessible: site.accessibility.wheelchairAccessible,
        parkingAvailable: site.accessibility.parkingAvailable,
        publicTransitNearby: site.accessibility.publicTransitNearby,
        restrooms: site.accessibility.restrooms,
      });
    } else {
      setEditingSite(null);
      setFormData({
        name: '',
        description: '',
        address: '',
        city: '',
        province: 'Ontario',
        postalCode: '',
        siteType: 'park',
        size: 0,
        treeCount: 0,
        coordinatorId: '',
        status: 'active',
        notes: '',
        wheelchairAccessible: false,
        parkingAvailable: false,
        publicTransitNearby: false,
        restrooms: false,
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSite(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const siteData: Site = {
      id: editingSite?.id || `site-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      postalCode: formData.postalCode,
      siteType: formData.siteType,
      size: Number(formData.size),
      treeCount: Number(formData.treeCount),
      species: editingSite?.species || [],
      accessibility: {
        wheelchairAccessible: formData.wheelchairAccessible,
        parkingAvailable: formData.parkingAvailable,
        publicTransitNearby: formData.publicTransitNearby,
        restrooms: formData.restrooms,
      },
      amenities: editingSite?.amenities || [],
      coordinatorId: formData.coordinatorId || undefined,
      status: formData.status,
      photos: editingSite?.photos || [],
      notes: formData.notes,
      createdAt: editingSite?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (editingSite) {
      updateSite(editingSite.id, siteData);
    } else {
      addSite(siteData);
    }

    handleCloseForm();
  };

  const handleDelete = (siteId: string, siteName: string) => {
    if (window.confirm(`Are you sure you want to delete "${siteName}"? This action cannot be undone.`)) {
      deleteSite(siteId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Site Management</h1>
        <Button onClick={() => handleOpenForm()}>
          <Plus size={20} className="mr-2" />
          Add New Site
        </Button>
      </div>

      {/* Site Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                {editingSite ? 'Edit Site' : 'Add New Site'}
              </h2>
              <button onClick={handleCloseForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="label">Site Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="e.g., High Park"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field"
                    rows={3}
                    placeholder="Brief description of the site"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="input-field"
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <label className="label">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Province *</label>
                  <select
                    required
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="input-field"
                  >
                    {PROVINCES.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="input-field"
                    placeholder="A1A 1A1"
                  />
                </div>

                <div>
                  <label className="label">Site Type *</label>
                  <select
                    required
                    value={formData.siteType}
                    onChange={(e) => setFormData({ ...formData, siteType: e.target.value as SiteType })}
                    className="input-field"
                  >
                    {SITE_TYPES.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Size (acres) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: parseFloat(e.target.value) })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Tree Count *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.treeCount}
                    onChange={(e) => setFormData({ ...formData, treeCount: parseInt(e.target.value) })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Status *</label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as SiteStatus })}
                    className="input-field"
                  >
                    {SITE_STATUS.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Coordinator</label>
                  <select
                    value={formData.coordinatorId}
                    onChange={(e) => setFormData({ ...formData, coordinatorId: e.target.value })}
                    className="input-field"
                  >
                    <option value="">No coordinator assigned</option>
                    {coordinators.map(coord => (
                      <option key={coord.id} value={coord.id}>
                        {coord.firstName} {coord.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="label">Accessibility Features</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.wheelchairAccessible}
                        onChange={(e) => setFormData({ ...formData, wheelchairAccessible: e.target.checked })}
                        className="mr-2"
                      />
                      Wheelchair Accessible
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.parkingAvailable}
                        onChange={(e) => setFormData({ ...formData, parkingAvailable: e.target.checked })}
                        className="mr-2"
                      />
                      Parking Available
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.publicTransitNearby}
                        onChange={(e) => setFormData({ ...formData, publicTransitNearby: e.target.checked })}
                        className="mr-2"
                      />
                      Public Transit Nearby
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.restrooms}
                        onChange={(e) => setFormData({ ...formData, restrooms: e.target.checked })}
                        className="mr-2"
                      />
                      Restrooms Available
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="label">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="input-field"
                    rows={3}
                    placeholder="Additional notes about the site"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCloseForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingSite ? 'Update Site' : 'Add Site'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sites Table */}
      <Card>
        <CardHeader><h2 className="text-2xl font-semibold">All Sites</h2></CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(sites).map(site => (
                  <tr key={site.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{site.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{site.siteType.replace('-', ' ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{site.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{site.treeCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        site.status === 'active' ? 'bg-green-100 text-green-800' :
                        site.status === 'seasonal' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {site.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOpenForm(site)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit site"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(site.id, site.name)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete site"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SiteManagement;

// Made with Bob
