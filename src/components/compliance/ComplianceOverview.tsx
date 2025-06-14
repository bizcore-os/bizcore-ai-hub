
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface ComplianceItem {
  name: string;
  status: string;
  dueDate: string | null;
  description: string;
}

interface ComplianceCategory {
  category: string;
  items: ComplianceItem[];
}

interface ComplianceOverviewProps {
  complianceItems: ComplianceCategory[];
}

const ComplianceOverview: React.FC<ComplianceOverviewProps> = ({ complianceItems }) => {
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'due-soon': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-emerald-600" size={16} />;
      case 'due-soon': return <Clock className="text-yellow-600" size={16} />;
      case 'overdue': return <AlertTriangle className="text-red-600" size={16} />;
      case 'pending': return <Clock className="text-gray-600" size={16} />;
      default: return <Clock className="text-gray-600" size={16} />;
    }
  };

  const handleComplianceAction = (item: ComplianceItem) => {
    toast({
      title: "Compliance Action",
      description: `Starting process for ${item.name}`,
    });
  };

  return (
    <div className="space-y-6">
      {complianceItems.map((category, index) => (
        <div key={index}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
          <div className="space-y-3">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    {item.dueDate && (
                      <p className="text-xs text-gray-500 mt-1">Due: {item.dueDate}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.replace('-', ' ')}
                  </Badge>
                  {item.status !== 'completed' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleComplianceAction(item)}
                    >
                      {item.status === 'overdue' ? 'Fix Now' : 'Start'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplianceOverview;
